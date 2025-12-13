import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Provide()
export class RagService {
    @Inject()
    ctx: Context;

    /**
     * 使用阿里云百炼 text-embedding-v2 模型将文本转换为向量
     */
    async textToVector(text: string, apiKey: string, baseURL?: string): Promise<number[]> {
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
                return response.data.output.embeddings[0].embedding
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
    async insertVector(
        text: string,
        dashvectorApiKey: string,
        openaiApiKey: string,
        docId?: string,
        dashvectorEndpoint?: string,
        openaiBaseURL?: string
    ): Promise<any> {
        try {
            // 1. 将文本转换为向量
            this.ctx.logger.info(`开始向量化文本: ${text.substring(0, 100)}...`);
            const vector = await this.textToVector(text, openaiApiKey, openaiBaseURL);

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
    async queryVector(
        text: string,
        dashvectorApiKey: string,
        dashscopeApiKey: string,
        topk: number = 10,
        includeVector: boolean = false,
        dashvectorEndpoint?: string,
        dashscopeURL?: string,
        collectionName: string = 'Schoober_Doc_Collection'
    ): Promise<any> {
        try {
            // 1. 将查询文本转换为向量
            this.ctx.logger.info(`开始向量化查询文本: ${text.substring(0, 100)}...`);
            const vector = await this.textToVector(text, dashscopeApiKey, dashscopeURL);

            // 2. 构造查询请求
            const queryData = {
                vector: vector,
                topk: topk,
                include_vector: includeVector
            };

            // 3. 调用 DashVector 查询 API
            const endpoint = dashvectorEndpoint ||
                `https://vrs-cn-1wy4kbz6a00011.dashvector.cn-hangzhou.aliyuncs.com/v1/collections/${collectionName}/query`;

            this.ctx.logger.info(`开始查询 DashVector: endpoint=${endpoint}, topk=${topk}`);

            const response = await axios.post(
                endpoint,
                queryData,
                {
                    headers: {
                        'dashvector-auth-token': dashvectorApiKey,
                        'Content-Type': 'application/json',
                    },
                }
            );

            this.ctx.logger.info(`查询成功: 返回${response.data.output?.length || 0}条结果`);

            return {
                query: text,
                topk: topk,
                results: response.data.output || [],
                total: response.data.output?.length || 0,
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
}
