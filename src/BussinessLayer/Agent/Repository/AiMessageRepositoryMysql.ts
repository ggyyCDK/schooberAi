import { Inject, Provide } from "@midwayjs/core";
import { Context } from "@midwayjs/web";
import { getConnection, getRepository } from "typeorm";
import { AI_MESSAGE, IAiMessageRepository } from "../Domain/Agent/AiMessageRepository";
import { AiMessageModel } from "../Domain/Agent/AiMessage";

@Provide(AI_MESSAGE)
export class AiMessageRepositoryMysql implements IAiMessageRepository {
    @Inject()
    ctx: Context;

    async findById(id: string): Promise<AiMessageModel | null> {
        const repo = getRepository(AiMessageModel);
        const result = await repo.findOne({
            where: {
                id
            }
        });
        return result ?? null;
    }

    async listBySessionId(sessionId: string): Promise<AiMessageModel[]> {
        const repo = getRepository(AiMessageModel);
        return await repo.find({
            where: {
                sessionId
            },
            order: {
                createDate: "ASC"
            }
        });
    }

    async deleteMessageBySessionId(sessionId: string): Promise<boolean> {
        const repo = getRepository(AiMessageModel);
        const result = await repo.delete({ sessionId });
        return (result.affected ?? 0) > 0;
    }

    async save(message: AiMessageModel): Promise<AiMessageModel | undefined> {
        return await getConnection().transaction(async transactionManager => {
            const repository = transactionManager.getRepository(AiMessageModel);
            return await repository.save(message);
        });
    }
}
