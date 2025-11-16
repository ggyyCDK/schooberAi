import { Context } from "@midwayjs/web";
import { AiStreamChatInputCommand } from '../../../../Helper/Types/chat';
export declare const AI_STUDIO_AI_CHAT = "AI_STUDIO_AI_CHAT";
export declare class AiChatService {
    ctx: Context;
    private buildRequestParam;
    aiChatWithStream(command: AiStreamChatInputCommand): Promise<void>;
}
