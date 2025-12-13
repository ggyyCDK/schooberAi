import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { ApiTags, ApiOperation, ApiResponse } from '@midwayjs/swagger';
import { RagInsertRequestDTO } from './RequestDTO/RagInsertRequestDTO';
import { RagQueryRequestDTO } from './RequestDTO/RagQueryRequestDTO';
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
        try {
            const { text, topk = 10, includeVector = false } = body;

            // 从环境变量读取 API Keys
            const dashvectorApiKey = process.env.DASHVECTOR_API_KEY;
            const dashscopeApiKey = process.env.DASHSCOPE_API_KEY; // 阿里云百炼 API Key
            const dashscopeURL = process.env.DASHSCOPE_EMBEDDING_URL; // 可选，默认使用百炼嵌入接口
            const dashvectorEndpoint = process.env.DASHVECTOR_QUERY_ENDPOINT; // 可选

            this.ctx.logger.info(`开始处理RAG查询: text长度=${text.length}, topk=${topk}`);

            const result = await this.ragService.queryVector(
                text,
                dashvectorApiKey,
                dashscopeApiKey,
                topk,
                includeVector,
                dashvectorEndpoint,
                dashscopeURL
            );

            return {
                success: true,
                data: result,
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

            const result = await this.ragService.insertVector(
                text,
                dashvectorApiKey,
                dashscopeApiKey,
                docId,
                dashvectorEndpoint,
                dashscopeURL
            );

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
}
