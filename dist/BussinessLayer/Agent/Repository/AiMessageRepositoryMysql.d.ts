import { Context } from "@midwayjs/web";
import { IAiMessageRepository } from "../Domain/Agent/AiMessageRepository";
import { AiMessageModel } from "../Domain/Agent/AiMessage";
export declare class AiMessageRepositoryMysql implements IAiMessageRepository {
    ctx: Context;
    findById(id: string): Promise<AiMessageModel | null>;
    listBySessionId(sessionId: string): Promise<AiMessageModel[]>;
    deleteMessageBySessionId(sessionId: string): Promise<boolean>;
    save(message: AiMessageModel): Promise<AiMessageModel | undefined>;
}
