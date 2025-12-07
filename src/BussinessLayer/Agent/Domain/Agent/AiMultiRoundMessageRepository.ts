import { Repository } from "@/Shared/SeedWork/Respository";
import { AiMultiRoundMessageModel } from "./AiMultiRoundMessage";

export const AI_MULTI_ROUND_MESSAGE = `AI_MULTI_ROUND_MESSAGE`;

export interface IAiMultiRoundMessageRepository extends Repository<AiMultiRoundMessageModel> {
    findById(id: string): Promise<AiMultiRoundMessageModel | null>;
    findByMsgId(msgId: string): Promise<AiMultiRoundMessageModel | null>;
    listByConversationId(conversationId: string): Promise<AiMultiRoundMessageModel[]>;
    deleteMessageByConversationId(conversationId: string): Promise<boolean>;
    save(aggregator: AiMultiRoundMessageModel): Promise<AiMultiRoundMessageModel | undefined>;
}