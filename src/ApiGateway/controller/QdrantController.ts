import { Inject, Controller, Post, Body, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { ApiTags, ApiOperation, ApiResponse } from '@midwayjs/swagger';
import { QdrantService } from '@/BussinessLayer/Rag/Application/service/QdrantService';
import { QdrantInsertRequestDTO } from './RequestDTO/QdrantInsertRequestDTO';
import { QdrantQueryRequestDTO } from './RequestDTO/QdrantQueryRequestDTO';
import { QdrantDeleteRequestDTO } from './RequestDTO/QdrantDeleteRequestDTO';
import { QdrantBatchInsertRequestDTO } from './RequestDTO/QdrantBatchInsertRequestDTO';
import { QdrantCreateIndexRequestDTO } from './RequestDTO/QdrantCreateIndexRequestDTO';

@ApiTags(['Qdrant向量数据库服务'])
@Controller('/api/v1/qdrant')
export class QdrantController {
    @Inject()
    ctx: Context;

    @Inject()
    qdrantService: QdrantService;

    @ApiOperation({ summary: '插入向量', description: '将文本向量化后插入到 Qdrant' })
    @ApiResponse({
        status: 200,
        description: '向量插入成功',
    })
    @Post('/insert')
    async insert(@Body() body: QdrantInsertRequestDTO) {
        try {
            const { text, collectionName, payload } = body;
            const dashscopeApiKey = process.env.DASHSCOPE_API_KEY;

            this.ctx.logger.info(`[Qdrant] 开始插入向量: text长度=${text.length}`);

            const result = await this.qdrantService.insertVector({
                text,
                dashscopeApiKey,
                collectionName,
                payload,
            });

            return {
                success: true,
                data: result,
                message: 'Qdrant 向量插入成功',
            };
        } catch (error) {
            this.ctx.logger.error(`Qdrant 向量插入失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `插入失败: ${error.message}`,
            };
        }
    }

    @ApiOperation({ summary: '批量插入向量', description: '批量将文本向量化后插入到 Qdrant' })
    @ApiResponse({
        status: 200,
        description: '批量向量插入成功',
    })
    @Post('/batch-insert')
    async batchInsert(@Body() body: QdrantBatchInsertRequestDTO) {
        try {
            const { items, collectionName } = body;
            const dashscopeApiKey = process.env.DASHSCOPE_API_KEY;

            this.ctx.logger.info(`[Qdrant] 开始批量插入向量: 共 ${items.length} 条`);

            const result = await this.qdrantService.batchInsertVectors({
                items,
                dashscopeApiKey,
                collectionName,
            });

            return {
                success: true,
                data: result,
                message: 'Qdrant 批量向量插入成功',
            };
        } catch (error) {
            this.ctx.logger.error(`Qdrant 批量插入失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `批量插入失败: ${error.message}`,
            };
        }
    }

    @ApiOperation({ summary: '查询相似向量', description: '根据文本查询 Qdrant 中的相似向量' })
    @ApiResponse({
        status: 200,
        description: '向量查询成功',
    })
    @Post('/query')
    async query(@Body() body: QdrantQueryRequestDTO) {
        const startTime = Date.now();
        try {
            const { text, topk = 10, collectionName, filter, scoreThreshold, useRerank = false, rerankTopN } = body;
            const dashscopeApiKey = process.env.DASHSCOPE_API_KEY;

            this.ctx.logger.info(`════════════════════════════════════════════════════════════`);
            this.ctx.logger.info(`  Qdrant 向量查询开始`);
            this.ctx.logger.info(`════════════════════════════════════════════════════════════`);
            this.ctx.logger.info(`查询文本: ${text.substring(0, 50)}...`);
            this.ctx.logger.info(`TopK: ${topk}`);
            this.ctx.logger.info(`Rerank: ${useRerank ? '已启用' : '未启用'}`);

            const result = await this.qdrantService.queryVector({
                text,
                dashscopeApiKey,
                topk,
                collectionName,
                filter,
                scoreThreshold,
                useRerank,
                rerankTopN,
            });

            const totalDuration = Date.now() - startTime;

            this.ctx.logger.info(`════════════════════════════════════════════════════════════`);
            this.ctx.logger.info(`  性能统计`);
            this.ctx.logger.info(`════════════════════════════════════════════════════════════`);
            this.ctx.logger.info(`向量化耗时: ${result.timing?.vectorization || 0}ms`);
            this.ctx.logger.info(`Qdrant查询耗时: ${result.timing?.query || 0}ms`);
            if (useRerank) {
                this.ctx.logger.info(`Rerank耗时: ${result.timing?.rerank || 0}ms`);
            }
            this.ctx.logger.info(`接口总耗时: ${totalDuration}ms`);
            this.ctx.logger.info(`返回结果数: ${result.total}`);
            this.ctx.logger.info(`════════════════════════════════════════════════════════════`);

            return {
                success: true,
                data: {
                    ...result,
                    timing: {
                        ...result.timing,
                        controller: totalDuration,
                    },
                },
                message: 'Qdrant 向量查询成功',
            };
        } catch (error) {
            this.ctx.logger.error(`Qdrant 向量查询失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `查询失败: ${error.message}`,
            };
        }
    }

    @ApiOperation({ summary: '删除向量', description: '根据ID删除 Qdrant 中的向量' })
    @ApiResponse({
        status: 200,
        description: '向量删除成功',
    })
    @Post('/delete')
    async delete(@Body() body: QdrantDeleteRequestDTO) {
        try {
            const { docIds, collectionName } = body;

            this.ctx.logger.info(`[Qdrant] 开始删除向量: docIds=${docIds.join(', ')}`);

            const result = await this.qdrantService.deleteVector({
                docIds,
                collectionName,
            });

            return {
                success: true,
                data: result,
                message: 'Qdrant 向量删除成功',
            };
        } catch (error) {
            this.ctx.logger.error(`Qdrant 向量删除失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `删除失败: ${error.message}`,
            };
        }
    }

    @ApiOperation({ summary: '获取Collection信息', description: '获取指定 Collection 的详细信息' })
    @ApiResponse({
        status: 200,
        description: '获取成功',
    })
    @Get('/collection/info')
    async getCollectionInfo(@Query('collectionName') collectionName?: string) {
        try {
            const result = await this.qdrantService.getCollectionInfo(collectionName);

            return {
                success: true,
                data: result,
                message: '获取 Collection 信息成功',
            };
        } catch (error) {
            this.ctx.logger.error(`获取 Collection 信息失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `获取失败: ${error.message}`,
            };
        }
    }

    @ApiOperation({ summary: '获取所有Collections', description: '获取 Qdrant 中所有 Collections 列表' })
    @ApiResponse({
        status: 200,
        description: '获取成功',
    })
    @Get('/collections')
    async listCollections() {
        try {
            const result = await this.qdrantService.listCollections();

            return {
                success: true,
                data: result,
                message: '获取 Collections 列表成功',
            };
        } catch (error) {
            this.ctx.logger.error(`获取 Collections 列表失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `获取失败: ${error.message}`,
            };
        }
    }

    @ApiOperation({ summary: '创建Payload索引', description: '为 Collection 的 payload 字段创建索引，用于 filter 过滤查询' })
    @ApiResponse({
        status: 200,
        description: '索引创建成功',
    })
    @Post('/index/create')
    async createIndex(@Body() body: QdrantCreateIndexRequestDTO) {
        try {
            const { fieldName, fieldType, collectionName } = body;

            this.ctx.logger.info(`[Qdrant] 开始创建索引: field=${fieldName}, type=${fieldType}`);

            const result = await this.qdrantService.createPayloadIndex({
                fieldName,
                fieldType,
                collectionName,
            });

            return {
                success: true,
                data: result,
                message: 'Payload 索引创建成功',
            };
        } catch (error) {
            this.ctx.logger.error(`创建索引失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `创建索引失败: ${error.message}`,
            };
        }
    }

    @ApiOperation({ summary: '创建默认索引', description: '批量创建常用的 payload 索引（category, source, tags）' })
    @ApiResponse({
        status: 200,
        description: '默认索引创建成功',
    })
    @Post('/index/create-defaults')
    async createDefaultIndexes(@Query('collectionName') collectionName?: string) {
        try {
            this.ctx.logger.info(`[Qdrant] 开始创建默认索引`);

            const result = await this.qdrantService.createDefaultIndexes(collectionName);

            return {
                success: true,
                data: result,
                message: '默认索引创建完成',
            };
        } catch (error) {
            this.ctx.logger.error(`创建默认索引失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `创建默认索引失败: ${error.message}`,
            };
        }
    }
}
