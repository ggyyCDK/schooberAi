import { Inject, Provide } from "@midwayjs/core";
import { Context } from "@midwayjs/web";
import { AiMessageModel } from "../../Domain/Agent/AiMessage";
import { AI_MESSAGE, IAiMessageRepository } from "../../Domain/Agent/AiMessageRepository";
import { AiPrompt } from "@/Helper/Types/agent";
import { AI_MULTI_ROUND_MESSAGE, IAiMultiRoundMessageRepository } from "../../Domain/Agent/AiMultiRoundMessageRepository";
import { AiMultiRoundMessageModel } from "../../Domain/Agent/AiMultiRoundMessage";

@Provide()
export class AiMessageService {
    @Inject()
    ctx: Context;

    @Inject(AI_MESSAGE)
    aiMessageRepository: IAiMessageRepository;

    @Inject(AI_MULTI_ROUND_MESSAGE)
    aiMultiRoundMessageRepository: IAiMultiRoundMessageRepository;

    /**
     * 创建消息
     */
    async createAiMessage(command: {
        sessionId?: string;
        fromType?: string;
        messageContent?: AiPrompt[];
        workerId?: string;
        ext?: any;
        llmConfig?: any;
    }): Promise<AiMessageModel> {
        try {
            const message = new AiMessageModel({
                sessionId: command.sessionId,
                fromType: command.fromType,
                messageContent: command.messageContent,
                workerId: command.workerId,
                ext: command.ext,
                llmConfig: command.llmConfig,
            });

            const result = await this.aiMessageRepository.save(message);
            this.ctx.logger.info(`创建消息成功: ${result?.id}`);
            return result!;
        } catch (error) {
            this.ctx.logger.error(`创建消息失败: ${error.message}`, error);
            throw new Error(`创建消息失败: ${error.message}`);
        }
    }

    /**
     * 更新消息
     */
    async updateAiMessage(command: Partial<{
        id: string;
        sessionId?: string;
        fromType?: string;
        messageContent?: AiPrompt[];
        workerId?: string;
        ext?: any;
        llmConfig?: any;
    }>): Promise<AiMessageModel | null> {
        const { id } = command;
        if (!id) {
            throw new Error('更新消息必须提供 id');
        }

        try {
            const existMessage = await this.aiMessageRepository.findById(id);
            if (!existMessage) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的消息，无法更新`);
                return null;
            }

            if (command.sessionId !== undefined) existMessage.sessionId = command.sessionId;
            if (command.fromType !== undefined) existMessage.fromType = command.fromType;
            if (command.messageContent !== undefined) existMessage.messageContent = command.messageContent;
            if (command.workerId !== undefined) existMessage.workerId = command.workerId;
            if (command.ext !== undefined) existMessage.ext = command.ext;
            if (command.llmConfig !== undefined) existMessage.llmConfig = command.llmConfig;

            const result = await this.aiMessageRepository.save(existMessage);
            this.ctx.logger.info(`更新消息成功: ${id}`);
            return result!;
        } catch (error) {
            this.ctx.logger.error(`更新消息失败: ${error.message}`, error);
            throw new Error(`更新消息失败: ${error.message}`);
        }
    }

    /**
     * 根据 ID 查询消息
     */
    async findById(id: string): Promise<AiMessageModel | null> {
        try {
            const result = await this.aiMessageRepository.findById(id);
            if (!result) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的消息`);
                return null;
            }
            this.ctx.logger.info(`查询消息成功: ${id}`);
            return result;
        } catch (error) {
            this.ctx.logger.error(`查询消息失败: ${error.message}`, error);
            throw new Error(`查询消息失败: ${error.message}`);
        }
    }

    /**
     * 根据 sessionId 查询消息列表
     */
    async listBySessionId(sessionId: string): Promise<AiMessageModel[]> {
        try {
            const result = await this.aiMessageRepository.listBySessionId(sessionId);
            this.ctx.logger.info(`查询 sessionId 为 ${sessionId} 的消息，共 ${result.length} 条`);
            return result;
        } catch (error) {
            this.ctx.logger.error(`查询消息列表失败: ${error.message}`, error);
            throw new Error(`查询消息列表失败: ${error.message}`);
        }
    }

    /**
     * 根据 sessionId 删除消息
     */
    async deleteMessageBySessionId(sessionId: string): Promise<boolean> {
        try {
            const deleted = await this.aiMessageRepository.deleteMessageBySessionId(sessionId);
            this.ctx.logger.info(`删除 sessionId 为 ${sessionId} 的消息结果: ${deleted}`);
            return deleted;
        } catch (error) {
            this.ctx.logger.error(`删除消息失败: ${error.message}`, error);
            throw new Error(`删除消息失败: ${error.message}`);
        }
    }

    /**
     * 保存多轮对话消息
     */
    async saveChatMessage(sessionId: string, chatMessages: any): Promise<void> {
        try {
            const messageModel = new AiMultiRoundMessageModel({
                conversationId: sessionId,
                type: chatMessages.type || "Text", // 默认类型
                content: chatMessages.content,
                sender: chatMessages.sender,
                msgStatus: chatMessages.status || "complete",
                workerId: chatMessages?.workerId || 'guyu',
                ext: chatMessages.ext
            });
            await this.aiMultiRoundMessageRepository.save(messageModel);

            this.ctx.logger.info(`保存会话 ${sessionId} 的消息成功，共 ${chatMessages.length} 条`);
        } catch (error) {
            this.ctx.logger.error(`保存会话消息失败: ${error.message}`, error);
            throw new Error(`保存会话消息失败: ${error.message}`);
        }
    }

    /**
     * 获取多轮对话消息列表
     */
    async getChatMessages(sessionId: string): Promise<any[]> {
        try {
            const messages = await this.aiMultiRoundMessageRepository.listByConversationId(sessionId);

            return messages.map(msg => ({
                conversationId: msg.conversationId,
                msgId: msg.id,
                sender: msg.sender,
                sendTime: msg.createDate ? new Date(msg.createDate).getTime() : 0,
                status: msg.msgStatus,
                type: msg.type,
                content: msg.content,
                workerId: msg.workerId,
                ext: msg.ext
            }));
        } catch (error) {
            this.ctx.logger.error(`获取会话消息列表失败: ${error.message}`, error);
            throw new Error(`获取会话消息列表失败: ${error.message}`);
        }
    }
}
