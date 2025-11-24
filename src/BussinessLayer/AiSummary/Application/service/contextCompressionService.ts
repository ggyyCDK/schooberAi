import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { contextCompressionAgentFactory } from '@/BussinessLayer/AiSummary/Mastra/agents/contextCompressionAgent';
import { CONTEXT_COMPRESSION_USER_PROMPT } from '@/BussinessLayer/AiSummary/Mastra/prompts/contextCompressionPrompt';
import { AI_SESSION_SUMMARY, IAiSessionSummaryRepository } from '@/BussinessLayer/Agent/Domain/Agent/AiSessionSummaryRepository';
import { AI_MESSAGE, IAiMessageRepository } from '@/BussinessLayer/Agent/Domain/Agent/AiMessageRepository';
import { AiSessionSummaryModel } from '@/BussinessLayer/Agent/Domain/Agent/AiSessionSummary';

@Provide()
export class ContextCompressionService {
    @Inject()
    ctx: Context;

    @Inject(AI_SESSION_SUMMARY)
    aiSessionSummaryRepository: IAiSessionSummaryRepository;

    @Inject(AI_MESSAGE)
    aiMessageRepository: IAiMessageRepository;

    /**
     * 压缩会话上下文
     * @param sessionId 会话ID
     * @param conversationHistory 对话历史（JSON字符串）
     * @returns 压缩后的内容
     */
    async compressSessionContext(sessionId: string, conversationHistory: string) {
        try {
            // 1. 创建压缩 Agent
            const compressionAgent = await contextCompressionAgentFactory();

            // 2. 构建用户提示
            const userPrompt = CONTEXT_COMPRESSION_USER_PROMPT(conversationHistory);

            // 3. 执行压缩
            const lastMessage = await this.getLastMessage(sessionId);

            const result = await compressionAgent.generate(userPrompt, {
                maxSteps: 5,
                maxRetries: 2,
            });

            const compressedContent = result.text || '';

            // 4. 保存压缩结果
            await this.saveSummary(sessionId, compressedContent, lastMessage?.id);

            return {
                sessionId,
                compressedContent,
                originalMessageCount: await this.getMessageCount(sessionId),
                lastMessageId: lastMessage?.id
            };
        } catch (error) {
            this.ctx.logger.error(`压缩会话上下文失败: ${error.message}`, error);
            throw error;
        }
    }

    /**
     * 获取最后一条消息
     */
    private async getLastMessage(sessionId: string) {
        const messages = await this.aiMessageRepository.listBySessionId(sessionId);
        return messages && messages.length > 0 ? messages[messages.length - 1] : null;
    }

    /**
     * 获取消息数量
     */
    private async getMessageCount(sessionId: string): Promise<number> {
        const messages = await this.aiMessageRepository.listBySessionId(sessionId);
        return messages ? messages.length : 0;
    }

    /**
     * 保存压缩摘要
     */
    private async saveSummary(sessionId: string, compressedContent: string, lastMsgId?: string) {
        try {
            // 检查是否已存在摘要
            let summary = await this.aiSessionSummaryRepository.findBySessionId(sessionId);

            if (summary) {
                // 更新现有摘要
                summary.name = this.generateSummaryName(compressedContent);
                summary.lastMsgId = lastMsgId;
                summary.summaryContent = compressedContent;
                summary.ext = {
                    ...summary.ext,
                    compressedAt: new Date().toISOString()
                };
            } else {
                // 创建新摘要
                summary = new AiSessionSummaryModel({
                    sessionId,
                    name: this.generateSummaryName(compressedContent),
                    lastMsgId,
                    summaryContent: compressedContent,
                    ext: {
                        compressedAt: new Date().toISOString()
                    }
                });
            }

            await this.aiSessionSummaryRepository.save(summary);
            this.ctx.logger.info(`会话 ${sessionId} 的压缩摘要已保存`);
        } catch (error) {
            this.ctx.logger.error(`保存压缩摘要失败: ${error.message}`, error);
            throw error;
        }
    }

    /**
     * 生成摘要名称（从压缩内容中提取前50个字符）
     */
    private generateSummaryName(content: string): string {
        const cleaned = content.replace(/\n/g, ' ').trim();
        return cleaned.length > 50 ? cleaned.substring(0, 50) + '...' : cleaned;
    }

    /**
     * 获取会话的压缩摘要
     */
    async getSummary(sessionId: string) {
        return await this.aiSessionSummaryRepository.findBySessionId(sessionId);
    }

    /**
     * 删除会话的压缩摘要
     */
    async deleteSummary(sessionId: string) {
        return await this.aiSessionSummaryRepository.deleteBySessionId(sessionId);
    }
}