import { Inject, Provide } from "@midwayjs/core";
import { Context } from "@midwayjs/web";
import { getConnection, getRepository } from "typeorm";
import { AI_MULTI_ROUND_MESSAGE, IAiMultiRoundMessageRepository } from "../Domain/Agent/AiMultiRoundMessageRepository";
import { AiMultiRoundMessageModel } from "../Domain/Agent/AiMultiRoundMessage";

@Provide(AI_MULTI_ROUND_MESSAGE)
export class AiMultiRoundMessageRepositoryMysql implements IAiMultiRoundMessageRepository {
    @Inject()
    ctx: Context;

    async findById(id: string): Promise<AiMultiRoundMessageModel | null> {
        const repo = getRepository(AiMultiRoundMessageModel);
        const result = await repo.findOne({
            where: {
                id
            }
        });
        return result ?? null;
    }

    async findByMsgId(msgId: string): Promise<AiMultiRoundMessageModel | null> {
        const repo = getRepository(AiMultiRoundMessageModel);
        const result = await repo.findOne({
            where: {
                msgId
            }
        });
        return result ?? null;
    }

    async listByConversationId(conversationId: string): Promise<AiMultiRoundMessageModel[]> {
        const repo = getRepository(AiMultiRoundMessageModel);
        return await repo.find({
            where: {
                conversationId
            },
            order: {
                createDate: "ASC"
            }
        });
    }

    async deleteMessageByConversationId(conversationId: string): Promise<boolean> {
        const repo = getRepository(AiMultiRoundMessageModel);
        const result = await repo.delete({ conversationId });
        return (result.affected ?? 0) > 0;
    }

    async save(message: AiMultiRoundMessageModel): Promise<AiMultiRoundMessageModel | undefined> {
        return await getConnection().transaction(async transactionManager => {
            const repository = transactionManager.getRepository(AiMultiRoundMessageModel);
            return await repository.save(message);
        });
    }
}