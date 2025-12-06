import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { contextCompressionAgentFactory } from '@/BussinessLayer/AiSummary/Mastra/agents/contextCompressionAgent';
import { CONTEXT_COMPRESSION_USER_PROMPT, SYSTEM_PROMPT_TOKENS } from '@/BussinessLayer/AiSummary/Mastra/prompts/contextCompressionPrompt';
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
     * 压缩会话上下文（完整流程）
     * @param sessionId 会话ID
     * @returns 压缩后的内容
     */
    async compressSessionContext(sessionId: string, apiKey?: string) {
        try {
            this.ctx.logger.info(`开始压缩会话上下文，sessionId: ${sessionId}`);

            // 1. 从数据库查询消息列表
            const messages = await this.aiMessageRepository.listBySessionId(sessionId);

            if (!messages || messages.length === 0) {
                throw new Error('该会话没有消息记录');
            }

            // 2. 过滤并格式化消息（提取system消息和非system消息）
            const { filteredMessages, systemMessages } = this.filterAndFormatMessages(messages);

            if (filteredMessages.length === 0) {
                throw new Error('过滤system消息后，没有可压缩的消息');
            }

            const conversationHistory = JSON.stringify(filteredMessages);

            this.ctx.logger.info(`查询到 ${messages.length} 条消息，过滤后 ${filteredMessages.length} 条，system消息 ${systemMessages.length} 条，开始压缩`);

            // 3. 创建压缩 Agent
            const compressionAgent = await contextCompressionAgentFactory(apiKey);

            // 4. 构建用户提示
            const userPrompt = CONTEXT_COMPRESSION_USER_PROMPT(conversationHistory);

            // 5. 执行压缩
            const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1] : null;

            const result = await compressionAgent.generate(userPrompt, {
                maxSteps: 5,
                maxRetries: 2,
            });
            let compressedContent = result.text || '';
            let compressedUsage = result.usage.completionTokens + SYSTEM_PROMPT_TOKENS || {}
            // 6. system消息不参与压缩
            compressedContent = `[Compressed Conversation]\n${compressedContent}`;

            // 7. 保存压缩结果
            await this.saveSummary(sessionId, compressedContent, lastMessage?.id);

            this.ctx.logger.info(`会话上下文压缩完成，sessionId: ${sessionId}`);

            return {
                sessionId,
                lastMessageId: lastMessage?.id,
                compressedUsage
            };
        } catch (error) {
            this.ctx.logger.error(`压缩会话上下文失败: ${error.message}`, error);
            throw error;
        }
    }


    /**
     * 过滤并格式化消息（排除system角色的消息）
     * @returns { filteredMessages, systemMessages } 过滤后的消息和system消息
     */
    private filterAndFormatMessages(messages: any[]) {
        const systemMessages: any[] = [];
        const filteredMessages: any[] = [];

        messages.forEach(msg => {
            if (Array.isArray(msg.messageContent)) {
                // 提取system消息
                const systemItems = msg.messageContent.filter(item => item.role === 'system');
                if (systemItems.length > 0) {
                    systemMessages.push(...systemItems);
                }

                // 过滤掉system消息
                const filtered = msg.messageContent.filter(item => item.role !== 'system');
                if (filtered.length > 0) {
                    filteredMessages.push({
                        role: msg.fromType,
                        content: filtered
                    });
                }
            } else {
                filteredMessages.push({
                    role: msg.fromType,
                    content: msg.messageContent
                });
            }
        });

        return { filteredMessages, systemMessages };
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
                    compressedAt: new Date().getTime()
                };
            } else {
                // 创建新摘要
                summary = new AiSessionSummaryModel({
                    sessionId,
                    name: this.generateSummaryName(compressedContent),
                    lastMsgId,
                    summaryContent: compressedContent,
                    ext: {
                        compressedAt: new Date().getTime()
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