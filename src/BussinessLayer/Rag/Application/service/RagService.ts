import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Provide()
export class RagService {
    @Inject()
    ctx: Context;

    /**
     * 使用阿里云百炼 rerank 模型对查询结果重新排序
     */
    async rerankResults(command: {
        query: string;
        documents: string[];
        apiKey: string;
        topN?: number;
    }): Promise<{ rankings: any[]; duration: number }> {
        const startTime = Date.now();
        try {
            const { query, documents, apiKey, topN } = command;
            
            if (!documents || documents.length === 0) {
                return { rankings: [], duration: 0 };
            }

            // 阿里云百炼 Rerank API
            const rerankURL = 'https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank';
            
            const response = await axios.post(
                rerankURL,
                {
                    model: 'gte-rerank',
                    input: {
                        query: query,
                        documents: documents
                    },
                    parameters: {
                        top_n: topN || documents.length,
                        return_documents: true
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            const duration = Date.now() - startTime;

            // 百炼返回格式: response.data.output.results
            if (response.data.output && response.data.output.results) {
                return {
                    rankings: response.data.output.results,
                    duration
                };
            } else {
                throw new Error('百炼 Rerank API 返回数据格式异常');
            }
        } catch (error) {
            this.ctx.logger.error(`Rerank 失败: ${error.message}`, error);
            if (axios.isAxiosError(error)) {
                this.ctx.logger.error(`百炼 Rerank API 响应: ${JSON.stringify(error.response?.data)}`);
            }
            throw new Error(`Rerank 失败: ${error.message}`);
        }
    }

    /**
     * 使用阿里云百炼 text-embedding-v2 模型将文本转换为向量
     */
    async textToVector(text: string, apiKey: string, baseURL?: string): Promise<{ vector: number[]; duration: number }> {
        const startTime = Date.now();
        try {
            // 阿里云百炼 API 调用
            const dashscopeURL = 'https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/text-embedding';
            console.log('apiKey is:', apiKey)
            const response = await axios.post(
                dashscopeURL,
                {
                    model: 'text-embedding-v2',
                    input: {
                        texts: [text]
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            // 百炼返回格式: response.data.output.embeddings[0].embedding
            if (response.data.output && response.data.output.embeddings && response.data.output.embeddings.length > 0) {
                const duration = Date.now() - startTime;
                return {
                    vector: response.data.output.embeddings[0].embedding,
                    duration
                };
            } else {
                throw new Error('百炼 API 返回数据格式异常');
            }
        } catch (error) {
            this.ctx.logger.error(`文本向量化失败: ${error.message}`, error);
            if (axios.isAxiosError(error)) {
                this.ctx.logger.error(`百炼 API 响应: ${JSON.stringify(error.response?.data)}`);
            }
            throw new Error(`文本向量化失败: ${error.message}`);
        }
    }

    /**
     * 向 DashVector 插入向量数据
     */
    async insertVector(command: {
        text: string;
        dashvectorApiKey: string;
        dashscopeApiKey: string;
        docId?: string;
        dashvectorEndpoint?: string;
        dashscopeURL?: string;
    }): Promise<any> {
        try {
            const { text, dashvectorApiKey, dashscopeApiKey, docId, dashvectorEndpoint, dashscopeURL } = command;

            // 1. 将文本转换为向量
            this.ctx.logger.info(`开始向量化文本: ${text.substring(0, 100)}...`);
            const { vector } = await this.textToVector(text, dashscopeApiKey, dashscopeURL);

            // 2. 生成文档ID（如果未提供）
            const id = docId || uuidv4();
            console.log('插入向量', id, vector, text)
            // 3. 构造请求数据
            const requestData = {
                docs: [
                    {
                        id: id,
                        vector: vector,
                        fields: {
                            document: text
                        }
                    }
                ]
            };

            // 4. 调用 DashVector API
            const endpoint = dashvectorEndpoint ||
                'https://vrs-cn-1wy4kbz6a00011.dashvector.cn-hangzhou.aliyuncs.com/v1/collections/Schoober_Doc_Collection/docs';

            this.ctx.logger.info(`开始插入向量到 DashVector: endpoint=${endpoint}, docId=${id}`);

            const response = await axios.post(
                endpoint,
                requestData,
                {
                    headers: {
                        'dashvector-auth-token': dashvectorApiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            this.ctx.logger.info(`向量插入成功: docId=${id}, vectorDimension=${vector.length}`);

            return {
                docId: id,
                vectorDimension: vector.length,
                text: text,
                timestamp: new Date().toISOString(),
                dashvectorResponse: response.data,
            };
        } catch (error) {
            this.ctx.logger.error(`向量插入失败: ${error.message}`, error);
            if (axios.isAxiosError(error)) {
                this.ctx.logger.error(`DashVector API 响应: ${JSON.stringify(error.response?.data)}`);
            }
            throw new Error(`向量插入失败: ${error.message}`);
        }
    }

    /**
     * 查询相似向量
     */
    async queryVector(command: {
        text: string;
        dashvectorApiKey: string;
        dashscopeApiKey: string;
        topk?: number;
        includeVector?: boolean;
        dashvectorEndpoint?: string;
        dashscopeURL?: string;
        collectionName?: string;
        useRerank?: boolean;
        rerankTopN?: number;
    }): Promise<any> {
        const totalStartTime = Date.now();
        try {
            const {
                text,
                dashvectorApiKey,
                dashscopeApiKey,
                topk = 10,
                includeVector = false,
                dashvectorEndpoint,
                dashscopeURL,
                // collectionName = 'Schoober_Doc_Collection'
                useRerank = false,
                rerankTopN
            } = command;
            console.log('service  dashvectorApiKey', dashvectorApiKey)
            // 1. 将查询文本转换为向量
            this.ctx.logger.info(`[1/${useRerank ? '4' : '3'}] 开始向量化查询文本: ${text.substring(0, 100)}...`);
            const { vector, duration: vectorDuration } = await this.textToVector(text, dashscopeApiKey, dashscopeURL);
            this.ctx.logger.info(`✓ 向量化完成 (耗时: ${vectorDuration}ms, 维度: ${vector.length})`);

            // 2. 构造查询请求
            const queryData = {
                vector: vector,
                topk: topk,
                include_vector: includeVector
            };

            // 3. 调用 DashVector 查询 API
            const endpoint = dashvectorEndpoint ||
                `https://vrs-cn-1wy4kbz6a00011.dashvector.cn-hangzhou.aliyuncs.com/v1/collections/Schoober_Doc_Collection/query`;

            this.ctx.logger.info(`[2/${useRerank ? '4' : '3'}] 开始查询 DashVector: endpoint=${endpoint}, topk=${topk}`);
            const queryStartTime = Date.now();

            const response = await axios.post(
                endpoint,
                queryData,
                {
                    headers: {
                        'dashvector-auth-token': 'sk-dtxUd5j8TFPUM2ejovKjFyytnRp2p22D9C2EAD72A11F0B1874EF7CE89A76A',
                        'Content-Type': 'application/json',
                    },
                }
            );

            const queryDuration = Date.now() - queryStartTime;
            this.ctx.logger.info(`✓ 查询完成 (耗时: ${queryDuration}ms)`);

            let results = response.data.output || [];
            let rerankDuration = 0;
            let rerankedResults = null;

            // 4. 如果启用 Rerank，对结果重新排序
            if (useRerank && results.length > 0) {
                this.ctx.logger.info(`[3/4] 开始 Rerank 重新排序...`);
                
                // 提取文档内容
                const documents = results.map((item: any) => item.fields?.document || '');
                
                const rerankResult = await this.rerankResults({
                    query: text,
                    documents: documents,
                    apiKey: dashscopeApiKey,
                    topN: rerankTopN || results.length
                });
                
                rerankDuration = rerankResult.duration;
                this.ctx.logger.info(`✓ Rerank 完成 (耗时: ${rerankDuration}ms)`);
                
                // 根据 Rerank 结果重新排序原始结果
                rerankedResults = rerankResult.rankings.map((ranking: any) => {
                    const originalResult = results[ranking.index];
                    return {
                        ...originalResult,
                        rerank_score: ranking.relevance_score,
                        original_index: ranking.index,
                        original_score: originalResult.score
                    };
                });
                
                results = rerankedResults;
            }

            const totalDuration = Date.now() - totalStartTime;

            this.ctx.logger.info(`[${useRerank ? '4/4' : '3/3'}] 总耗时: ${totalDuration}ms | 返回结果数: ${results.length}`);

            return {
                query: text,
                topk: topk,
                results: results,
                total: results.length,
                timing: {
                    vectorization: vectorDuration,
                    query: queryDuration,
                    rerank: rerankDuration,
                    total: totalDuration
                },
                rerank_enabled: useRerank,
                dashvectorResponse: response.data,
            };
        } catch (error) {
            this.ctx.logger.error(`向量查询失败: ${error.message}`, error);
            if (axios.isAxiosError(error)) {
                this.ctx.logger.error(`DashVector API 响应: ${JSON.stringify(error.response?.data)}`);
            }
            throw new Error(`向量查询失败: ${error.message}`);
        }
    }

    /**
     * 更新或插入向量数据 (Upsert)
     */
    async updateVector(command: {
        docId: string;
        text: string;
        dashvectorApiKey: string;
        dashscopeApiKey: string;
        dashvectorEndpoint?: string;
        dashscopeURL?: string;
        collectionName?: string;
    }): Promise<any> {
        try {
            const {
                docId,
                text,
                dashvectorApiKey,
                dashscopeApiKey,
                dashvectorEndpoint,
                dashscopeURL,
                collectionName = 'Schoober_Doc_Collection'
            } = command;

            // 1. 将文本转换为向量
            this.ctx.logger.info(`开始向量化文本: ${text.substring(0, 100)}...`);
            const { vector } = await this.textToVector(text, dashscopeApiKey, dashscopeURL);

            // 2. 构造请求数据
            const requestData = {
                docs: [
                    {
                        id: docId,
                        vector: vector,
                        fields: {
                            document: text
                        }
                    }
                ]
            };

            // 3. 调用 DashVector Upsert API
            const endpoint = dashvectorEndpoint ||
                `https://vrs-cn-1wy4kbz6a00011.dashvector.cn-hangzhou.aliyuncs.com/v1/collections/${collectionName}/docs/upsert`;

            this.ctx.logger.info(`开始更新向量到 DashVector: endpoint=${endpoint}, docId=${docId}`);

            const response = await axios.post(
                endpoint,
                requestData,
                {
                    headers: {
                        'dashvector-auth-token': dashvectorApiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            this.ctx.logger.info(`向量更新成功: docId=${docId}, vectorDimension=${vector.length}`);

            return {
                docId: docId,
                vectorDimension: vector.length,
                text: text,
                timestamp: new Date().toISOString(),
                dashvectorResponse: response.data,
            };
        } catch (error) {
            this.ctx.logger.error(`向量更新失败: ${error.message}`, error);
            if (axios.isAxiosError(error)) {
                this.ctx.logger.error(`DashVector API 响应: ${JSON.stringify(error.response?.data)}`);
            }
            throw new Error(`向量更新失败: ${error.message}`);
        }
    }
}
