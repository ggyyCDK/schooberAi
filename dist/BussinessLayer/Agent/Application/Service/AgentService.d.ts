import { Context } from "@midwayjs/web";
import { AiPrompt } from '../../../../Helper/Types/agent';
import { AiSessionService } from "./AiSessionService";
import { AiMessageService } from "./AiMessageService";
import { AiChatService } from "./AiChatService";
export declare class AgentService {
    ctx: Context;
    aiSessionService: AiSessionService;
    aiMessageService: AiMessageService;
    aiChatService: AiChatService;
    /**
     * 运行 AI Agent
     * @param command 运行参数
     * @returns Promise<void>
     */
    run(command: {
        sessionId?: string;
        workerId: string;
        businessType?: string;
        variableMaps: Record<string, any>;
        question: AiPrompt[];
    }): Promise<void>;
    /**
     * multiRoundChat 多轮对话方法参数
     * @param command
     *   - sessionId: string，会话ID，用于标识当前多轮对话所属会话
     *   - workerId: string，发起对话的worker的ID
     *   - messages: AiPrompt[]，本轮用户输入的消息内容数组
     *   - historyMessages: AiMessageModel[]，该会话的已存在历史消息列表
     *   - variableMaps: Record<string, any>，额外参数，例如大模型配置、用户自定义参数等
     */
    private multiRoundChat;
}
