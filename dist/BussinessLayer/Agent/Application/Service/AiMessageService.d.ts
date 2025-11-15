import { Context } from "@midwayjs/web";
import { AiMessageModel } from "../../Domain/Agent/AiMessage";
import { IAiMessageRepository } from "../../Domain/Agent/AiMessageRepository";
import { AiPrompt } from "../../../../Helper/Types/agent";
export declare class AiMessageService {
    ctx: Context;
    aiMessageRepository: IAiMessageRepository;
    /**
     * 创建消息
     */
    createAiMessage(command: {
        sessionId?: string;
        fromType?: string;
        messageContent?: AiPrompt[];
        workerId?: string;
        ext?: any;
        llmConfig?: any;
    }): Promise<AiMessageModel>;
    /**
     * 更新消息
     */
    updateAiMessage(command: Partial<{
        id: string;
        sessionId?: string;
        fromType?: string;
        messageContent?: AiPrompt[];
        workerId?: string;
        ext?: any;
        llmConfig?: any;
    }>): Promise<AiMessageModel | null>;
    /**
     * 根据 ID 查询消息
     */
    findById(id: string): Promise<AiMessageModel | null>;
    /**
     * 根据 sessionId 查询消息列表
     */
    listBySessionId(sessionId: string): Promise<AiMessageModel[]>;
    /**
     * 根据 sessionId 删除消息
     */
    deleteMessageBySessionId(sessionId: string): Promise<boolean>;
}
