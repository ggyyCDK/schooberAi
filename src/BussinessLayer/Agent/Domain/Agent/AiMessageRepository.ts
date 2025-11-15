import { Repository } from "@/Shared/SeedWork/Respository";
import { AiMessageModel } from "./AiMessage";

export const AI_MESSAGE = `AI_MESSAGE`;

export interface IAiMessageRepository extends Repository<AiMessageModel> {
    findById(id: string): Promise<AiMessageModel | null>;
    listBySessionId(sessionId: string): Promise<AiMessageModel[]>;
    deleteMessageBySessionId(sessionId: string): Promise<boolean>;
    save(aggregator: AiMessageModel): Promise<AiMessageModel | undefined>;
}
