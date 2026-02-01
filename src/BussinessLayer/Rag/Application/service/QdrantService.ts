import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { QdrantClient } from '@qdrant/js-client-rest';
import { v4 as uuidv4 } from 'uuid';
import { RagService } from './RagService';

@Provide()
export class QdrantService {
    @Inject()
    ctx: Context;

    @Inject()
    ragService: RagService;

    private client: QdrantClient;
    private readonly defaultCollectionName = 'my-collection';
    private readonly vectorDimension = 1536;

    /**
     * 获取 Qdrant 客户端实例
     */
    private getClient(): QdrantClient {
        if (!this.client) {
            this.client = new QdrantClient({
                url: 'https://89ebe303-002b-4dd1-9db6-07a203e7dc84.us-east4-0.gcp.cloud.qdrant.io:6333',
                apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOlt7ImNvbGxlY3Rpb24iOiJteS1jb2xsZWN0aW9uIiwiYWNjZXNzIjoicncifV19.ky7mEiC8h34ruLGqSVBPTXDS0JotRjSAQwKPbxv3Rx4',
            });
        }
        return this.client;
    }

    /**
     * 确保 collection 存在，不存在则创建
     */
    async ensureCollection(collectionName?: string): Promise<void> {
        const client = this.getClient();
        const name = collectionName || this.defaultCollectionName;

        try {
            const collections = await client.getCollections();
            const exists = collections.collections.some(c => c.name === name);

            if (!exists) {
                this.ctx.logger.info(`Collection ${name} 不存在，正在创建...`);
                await client.createCollection(name, {
                    vectors: {
                        size: this.vectorDimension,
                        distance: 'Cosine',
                    },
                });
                this.ctx.logger.info(`Collection ${name} 创建成功`);
            }
        } catch (error) {
            this.ctx.logger.error(`检查/创建 collection 失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 向 Qdrant 插入向量数据
     */
    async insertVector(command: {
        text: string;
        dashscopeApiKey: string;
        collectionName?: string;
        payload?: Record<string, any>;
    }): Promise<any> {
        const startTime = Date.now();
        try {
            const { text, dashscopeApiKey, collectionName, payload } = command;
            const collection = collectionName || this.defaultCollectionName;

            // 1. 确保 collection 存在
            await this.ensureCollection(collection);

            // 2. 将文本转换为向量
            this.ctx.logger.info(`开始向量化文本: ${text.substring(0, 100)}...`);
            const { vector, duration: vectorDuration } = await this.ragService.textToVector(text, dashscopeApiKey);

            // 3. 自动生成 UUID 作为文档ID
            const id = uuidv4();

            // 4. 插入到 Qdrant
            const client = this.getClient();
            this.ctx.logger.info(`开始插入向量到 Qdrant: collection=${collection}, docId=${id}`);

            const result = await client.upsert(collection, {
                wait: true,
                points: [
                    {
                        id: id,
                        vector: vector,
                        payload: {
                            document: text,
                            ...payload,
                        },
                    },
                ],
            });

            const totalDuration = Date.now() - startTime;
            this.ctx.logger.info(`向量插入成功: docId=${id}, 维度=${vector.length}, 耗时=${totalDuration}ms`);

            return {
                success: true,
                docId: id,
                vectorDimension: vector.length,
                text: text,
                timestamp: new Date().toISOString(),
                timing: {
                    vectorization: vectorDuration,
                    total: totalDuration,
                },
                qdrantResponse: result,
            };
        } catch (error) {
            this.ctx.logger.error(`Qdrant 向量插入失败: ${error.message}`, error);
            throw new Error(`Qdrant 向量插入失败: ${error.message}`);
        }
    }

    /**
     * 批量插入向量数据
     */
    async batchInsertVectors(command: {
        items: Array<{ text: string; payload?: Record<string, any> }>;
        dashscopeApiKey: string;
        collectionName?: string;
    }): Promise<any> {
        const startTime = Date.now();
        try {
            const { items, dashscopeApiKey, collectionName } = command;
            const collection = collectionName || this.defaultCollectionName;

            // 1. 确保 collection 存在
            await this.ensureCollection(collection);

            // 2. 批量向量化
            this.ctx.logger.info(`开始批量向量化 ${items.length} 条文本...`);
            const points = [];
            let totalVectorizationTime = 0;

            for (const item of items) {
                const { vector, duration } = await this.ragService.textToVector(item.text, dashscopeApiKey);
                totalVectorizationTime += duration;
                const id = uuidv4();
                points.push({
                    id: id,
                    vector: vector,
                    payload: {
                        document: item.text,
                        ...item.payload,
                    },
                });
            }

            // 3. 批量插入到 Qdrant
            const client = this.getClient();
            this.ctx.logger.info(`开始批量插入 ${points.length} 条向量到 Qdrant`);

            const result = await client.upsert(collection, {
                wait: true,
                points: points,
            });

            const totalDuration = Date.now() - startTime;
            this.ctx.logger.info(`批量插入成功: 共 ${points.length} 条, 耗时=${totalDuration}ms`);

            return {
                success: true,
                count: points.length,
                docIds: points.map(p => p.id),
                timestamp: new Date().toISOString(),
                timing: {
                    vectorization: totalVectorizationTime,
                    total: totalDuration,
                },
                qdrantResponse: result,
            };
        } catch (error) {
            this.ctx.logger.error(`Qdrant 批量插入失败: ${error.message}`, error);
            throw new Error(`Qdrant 批量插入失败: ${error.message}`);
        }
    }

    /**
     * 查询相似向量
     */
    async queryVector(command: {
        text: string;
        dashscopeApiKey: string;
        topk?: number;
        collectionName?: string;
        filter?: Record<string, any>;
        scoreThreshold?: number;
        useRerank?: boolean;
        rerankTopN?: number;
    }): Promise<any> {
        const startTime = Date.now();
        try {
            const {
                text,
                dashscopeApiKey,
                topk = 10,
                collectionName,
                filter,
                scoreThreshold,
                useRerank = false,
                rerankTopN,
            } = command;
            const collection = collectionName || this.defaultCollectionName;

            // 1. 将查询文本转换为向量
            this.ctx.logger.info(`[1/${useRerank ? '3' : '2'}] 开始向量化查询文本: ${text.substring(0, 100)}...`);
            const { vector, duration: vectorDuration } = await this.ragService.textToVector(text, dashscopeApiKey);
            this.ctx.logger.info(`向量化完成 (耗时: ${vectorDuration}ms, 维度: ${vector.length})`);

            // 2. 执行 Qdrant 查询
            const client = this.getClient();
            this.ctx.logger.info(`[2/${useRerank ? '3' : '2'}] 开始查询 Qdrant: collection=${collection}, topk=${topk}`);
            const queryStartTime = Date.now();

            const searchParams: any = {
                vector: vector,
                limit: topk,
                with_payload: true,
            };

            if (filter) {
                searchParams.filter = filter;
            }

            if (scoreThreshold !== undefined) {
                searchParams.score_threshold = scoreThreshold;
            }

            const searchResult = await client.search(collection, searchParams);
            const queryDuration = Date.now() - queryStartTime;
            this.ctx.logger.info(`查询完成 (耗时: ${queryDuration}ms, 结果数: ${searchResult.length})`);

            let results = searchResult.map(item => ({
                id: item.id,
                score: item.score,
                payload: item.payload,
            }));

            let rerankDuration = 0;

            // 3. 如果启用 Rerank，对结果重新排序
            if (useRerank && results.length > 0) {
                this.ctx.logger.info(`[3/3] 开始 Rerank 重新排序...`);
                const documents = results.map(item => item.payload.document as string);

                const rerankResult = await this.ragService.rerankResults({
                    query: text,
                    documents: documents,
                    apiKey: dashscopeApiKey,
                    topN: rerankTopN || results.length,
                });

                rerankDuration = rerankResult.duration;
                this.ctx.logger.info(`Rerank 完成 (耗时: ${rerankDuration}ms)`);

                // 根据 Rerank 结果重新排序
                results = rerankResult.rankings.map((ranking: any) => {
                    const originalResult = results[ranking.index];
                    return {
                        ...originalResult,
                        rerank_score: ranking.relevance_score,
                        original_index: ranking.index,
                        original_score: originalResult.score,
                    };
                });
            }

            const totalDuration = Date.now() - startTime;
            this.ctx.logger.info(`查询总耗时: ${totalDuration}ms | 返回结果数: ${results.length}`);

            return {
                success: true,
                query: text,
                topk: topk,
                results: results,
                total: results.length,
                timing: {
                    vectorization: vectorDuration,
                    query: queryDuration,
                    rerank: rerankDuration,
                    total: totalDuration,
                },
                rerank_enabled: useRerank,
            };
        } catch (error) {
            this.ctx.logger.error(`Qdrant 向量查询失败: ${error.message}`, error);
            throw new Error(`Qdrant 向量查询失败: ${error.message}`);
        }
    }

    /**
     * 根据 ID 删除向量
     */
    async deleteVector(command: {
        docIds: string[];
        collectionName?: string;
    }): Promise<any> {
        try {
            const { docIds, collectionName } = command;
            const collection = collectionName || this.defaultCollectionName;

            const client = this.getClient();
            this.ctx.logger.info(`开始删除向量: collection=${collection}, docIds=${docIds.join(', ')}`);

            const result = await client.delete(collection, {
                wait: true,
                points: docIds,
            });

            this.ctx.logger.info(`向量删除成功: ${docIds.length} 条`);

            return {
                success: true,
                deletedIds: docIds,
                count: docIds.length,
                timestamp: new Date().toISOString(),
                qdrantResponse: result,
            };
        } catch (error) {
            this.ctx.logger.error(`Qdrant 向量删除失败: ${error.message}`, error);
            throw new Error(`Qdrant 向量删除失败: ${error.message}`);
        }
    }

    /**
     * 根据 ID 获取向量详情
     */
    async getVectorById(command: {
        docIds: string[];
        collectionName?: string;
        withVector?: boolean;
    }): Promise<any> {
        try {
            const { docIds, collectionName, withVector = false } = command;
            const collection = collectionName || this.defaultCollectionName;

            const client = this.getClient();
            this.ctx.logger.info(`开始获取向量: collection=${collection}, docIds=${docIds.join(', ')}`);

            const result = await client.retrieve(collection, {
                ids: docIds,
                with_payload: true,
                with_vector: withVector,
            });

            this.ctx.logger.info(`获取向量成功: ${result.length} 条`);

            return {
                success: true,
                results: result.map(item => ({
                    id: item.id,
                    document: item.payload?.document || '',
                    payload: item.payload,
                    vector: withVector ? item.vector : undefined,
                })),
                count: result.length,
            };
        } catch (error) {
            this.ctx.logger.error(`Qdrant 获取向量失败: ${error.message}`, error);
            throw new Error(`Qdrant 获取向量失败: ${error.message}`);
        }
    }

    /**
     * 获取 collection 信息
     */
    async getCollectionInfo(collectionName?: string): Promise<any> {
        try {
            const collection = collectionName || this.defaultCollectionName;
            const client = this.getClient();

            const info = await client.getCollection(collection);

            return {
                success: true,
                collection: collection,
                info: info,
            };
        } catch (error) {
            this.ctx.logger.error(`获取 collection 信息失败: ${error.message}`, error);
            throw new Error(`获取 collection 信息失败: ${error.message}`);
        }
    }

    /**
     * 获取所有 collections 列表
     */
    async listCollections(): Promise<any> {
        try {
            const client = this.getClient();
            const result = await client.getCollections();

            return {
                success: true,
                collections: result.collections,
                count: result.collections.length,
            };
        } catch (error) {
            this.ctx.logger.error(`获取 collections 列表失败: ${error.message}`, error);
            throw new Error(`获取 collections 列表失败: ${error.message}`);
        }
    }

    /**
     * 创建 payload 索引（用于 filter 过滤查询）
     * @param fieldName 字段名
     * @param fieldType 字段类型: keyword, integer, float, bool, geo, datetime, text
     */
    async createPayloadIndex(command: {
        fieldName: string;
        fieldType: 'keyword' | 'integer' | 'float' | 'bool' | 'geo' | 'datetime' | 'text';
        collectionName?: string;
    }): Promise<any> {
        try {
            const { fieldName, fieldType, collectionName } = command;
            const collection = collectionName || this.defaultCollectionName;
            const client = this.getClient();

            this.ctx.logger.info(`开始创建 payload 索引: collection=${collection}, field=${fieldName}, type=${fieldType}`);

            await client.createPayloadIndex(collection, {
                field_name: fieldName,
                field_schema: fieldType,
                wait: true,
            });

            this.ctx.logger.info(`Payload 索引创建成功: ${fieldName}`);

            return {
                success: true,
                collection: collection,
                fieldName: fieldName,
                fieldType: fieldType,
                message: `索引 ${fieldName} 创建成功`,
            };
        } catch (error) {
            this.ctx.logger.error(`创建 payload 索引失败: ${error.message}`, error);
            throw new Error(`创建 payload 索引失败: ${error.message}`);
        }
    }

    /**
     * 批量创建常用 payload 索引
     */
    async createDefaultIndexes(collectionName?: string): Promise<any> {
        const collection = collectionName || this.defaultCollectionName;
        const defaultIndexes = [
            { fieldName: 'category', fieldType: 'keyword' as const },
            { fieldName: 'source', fieldType: 'keyword' as const },
            { fieldName: 'tags', fieldType: 'keyword' as const },
        ];

        const results = [];
        for (const index of defaultIndexes) {
            try {
                await this.createPayloadIndex({
                    fieldName: index.fieldName,
                    fieldType: index.fieldType,
                    collectionName: collection,
                });
                results.push({ fieldName: index.fieldName, success: true });
            } catch (error) {
                results.push({ fieldName: index.fieldName, success: false, error: error.message });
            }
        }

        return {
            success: true,
            collection: collection,
            indexes: results,
        };
    }
}
