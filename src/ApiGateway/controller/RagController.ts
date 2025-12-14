import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { ApiTags, ApiOperation, ApiResponse } from '@midwayjs/swagger';
import { RagInsertRequestDTO } from './RequestDTO/RagInsertRequestDTO';
import { RagQueryRequestDTO } from './RequestDTO/RagQueryRequestDTO';
import { RagUpdateRequestDTO } from './RequestDTO/RagUpdateRequestDTO';
import { RagService } from '@/BussinessLayer/Rag/Application/service/RagService';

@ApiTags(['向量RAG服务'])
@Controller('/api/v1/rag')
export class RagController {
    @Inject()
    ctx: Context;

    @Inject()
    ragService: RagService;

    @ApiOperation({ summary: 'RAG查询', description: '根据文本查询相似的向量数据' })
    @ApiResponse({
        status: 200,
        description: 'RAG查询执行成功',
    })
    @Post('/query')
    async query(@Body() body: RagQueryRequestDTO) {
        const controllerStartTime = Date.now();
        try {
            const { text, topk = 10, includeVector = false, useRerank = false, rerankTopN } = body;

            // 从环境变量读取 API Keys
            const dashvectorApiKey = '';
            const dashscopeApiKey = ''; // 阿里云百炼 API Key
            const dashscopeURL = process.env.DASHSCOPE_EMBEDDING_URL; // 可选，默认使用百炼嵌入接口
            const dashvectorEndpoint = process.env.DASHVECTOR_QUERY_ENDPOINT; // 可选

            this.ctx.logger.info(`════════════════════════════════════════════════════════════`);
            this.ctx.logger.info(`  RAG 接口查询开始`);
            this.ctx.logger.info(`════════════════════════════════════════════════════════════`);
            this.ctx.logger.info(`查询文本: ${text.substring(0, 50)}...`);
            this.ctx.logger.info(`TopK: ${topk}`);
            this.ctx.logger.info(`Rerank: ${useRerank ? '已启用' : '未启用'}`);
            if (useRerank && rerankTopN) {
                this.ctx.logger.info(`Rerank TopN: ${rerankTopN}`);
            }

            const serviceStartTime = Date.now();
            const result = await this.ragService.queryVector({
                text,
                dashvectorApiKey,
                dashscopeApiKey,
                topk,
                includeVector,
                dashvectorEndpoint,
                dashscopeURL,
                useRerank,
                rerankTopN
            });
            const serviceDuration = Date.now() - serviceStartTime;
            const totalDuration = Date.now() - controllerStartTime;

            this.ctx.logger.info(`════════════════════════════════════════════════════════════`);
            this.ctx.logger.info(`  性能统计 (接口方式)`);
            this.ctx.logger.info(`════════════════════════════════════════════════════════════`);
            this.ctx.logger.info(`向量化耗时: ${result.timing?.vectorization || 0}ms`);
            this.ctx.logger.info(`DashVector查询耗时: ${result.timing?.query || 0}ms`);
            if (useRerank) {
                this.ctx.logger.info(`Rerank耗时: ${result.timing?.rerank || 0}ms`);
            }
            this.ctx.logger.info(`Service层总耗时: ${serviceDuration}ms`);
            this.ctx.logger.info(`接口总耗时(含框架开销): ${totalDuration}ms`);
            this.ctx.logger.info(`框架开销: ${totalDuration - serviceDuration}ms`);
            this.ctx.logger.info(`返回结果数: ${result.total}`);
            this.ctx.logger.info(`════════════════════════════════════════════════════════════`);

            return {
                success: true,
                data: {
                    ...result,
                    timing: {
                        ...result.timing,
                        service: serviceDuration,
                        controller: totalDuration,
                        framework_overhead: totalDuration - serviceDuration
                    }
                },
                message: 'RAG查询成功'
            };
        } catch (error) {
            this.ctx.logger.error(`RAG查询失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `查询失败: ${error.message}`
            };
        }
    }

    @ApiOperation({ summary: 'RAG插入数据', description: '向RAG知识库插入数据，将文本向量化后存储到DashVector' })
    @ApiResponse({
        status: 200,
        description: 'RAG数据插入成功',
    })
    @Post('/insert')
    async insert(@Body() body: RagInsertRequestDTO) {
        try {
            const { text, docId } = body;

            // 从环境变量读取 API Keys
            const dashvectorApiKey = process.env.DASHVECTOR_API_KEY;
            const dashscopeApiKey = process.env.DASHSCOPE_API_KEY; // 阿里云百炼 API Key
            const dashscopeURL = process.env.DASHSCOPE_EMBEDDING_URL; // 可选，默认使用百炼嵌入接口
            const dashvectorEndpoint = process.env.DASHVECTOR_ENDPOINT; // 可选

            this.ctx.logger.info(`开始处理RAG数据插入: text长度=${text.length}, docId=${docId}`);

            const result = await this.ragService.insertVector({
                text,
                dashvectorApiKey,
                dashscopeApiKey,
                docId,
                dashvectorEndpoint,
                dashscopeURL
            });

            return {
                success: true,
                data: result,
                message: 'RAG数据插入成功'
            };
        } catch (error) {
            this.ctx.logger.error(`RAG数据插入失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `插入失败: ${error.message}`
            };
        }
    }

    @ApiOperation({ summary: 'RAG更新数据', description: '根据ID更新向量数据，如果ID不存在则插入新数据' })
    @ApiResponse({
        status: 200,
        description: 'RAG数据更新成功',
    })
    @Post('/update')
    async update(@Body() body: RagUpdateRequestDTO) {
        try {
            const { docId, text } = body;

            // 从环境变量读取 API Keys
            const dashvectorApiKey = process.env.DASHVECTOR_API_KEY;
            const dashscopeApiKey = process.env.DASHSCOPE_API_KEY; // 阿里云百炼 API Key
            const dashscopeURL = process.env.DASHSCOPE_EMBEDDING_URL; // 可选，默认使用百炼嵌入接口
            const dashvectorEndpoint = process.env.DASHVECTOR_UPSERT_ENDPOINT; // 可选

            this.ctx.logger.info(`开始处理RAG数据更新: docId=${docId}, text长度=${text.length}`);

            const result = await this.ragService.updateVector({
                docId,
                text,
                dashvectorApiKey,
                dashscopeApiKey,
                dashvectorEndpoint,
                dashscopeURL
            });

            return {
                success: true,
                data: result,
                message: 'RAG数据更新成功'
            };
        } catch (error) {
            this.ctx.logger.error(`RAG数据更新失败: ${error.message}`, error);
            return {
                success: false,
                data: null,
                message: `更新失败: ${error.message}`
            };
        }
    }
}
