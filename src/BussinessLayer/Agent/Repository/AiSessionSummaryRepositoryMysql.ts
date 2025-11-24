import { Inject, Provide } from "@midwayjs/core";
import { Context } from "@midwayjs/web";
import { getConnection, getRepository } from "typeorm";
import { AI_SESSION_SUMMARY, IAiSessionSummaryRepository } from "../Domain/Agent/AiSessionSummaryRepository";
import { AiSessionSummaryModel } from "../Domain/Agent/AiSessionSummary";

@Provide(AI_SESSION_SUMMARY)
export class AiSessionSummaryRepositoryMysql implements IAiSessionSummaryRepository {
    @Inject()
    ctx: Context;

    async findById(id: string): Promise<AiSessionSummaryModel | null> {
        const repo = getRepository(AiSessionSummaryModel);
        const result = await repo.findOne({
            where: {
                id
            }
        });
        return result ?? null;
    }

    async findBySessionId(sessionId: string): Promise<AiSessionSummaryModel | null> {
        const repo = getRepository(AiSessionSummaryModel);
        const result = await repo.findOne({
            where: {
                sessionId
            }
        });
        return result ?? null;
    }

    async listByWorkerId(workerId: string): Promise<AiSessionSummaryModel[]> {
        const repo = getRepository(AiSessionSummaryModel);
        return await repo.find({
            where: {
                workerId
            },
            order: {
                updatedAt: "DESC"
            }
        });
    }

    async listByBusinessType(businessType: string): Promise<AiSessionSummaryModel[]> {
        const repo = getRepository(AiSessionSummaryModel);
        return await repo.find({
            where: {
                businessType
            },
            order: {
                updatedAt: "DESC"
            }
        });
    }

    async deleteBySessionId(sessionId: string): Promise<boolean> {
        const repo = getRepository(AiSessionSummaryModel);
        const result = await repo.delete({ sessionId });
        return (result.affected ?? 0) > 0;
    }

    async save(summary: AiSessionSummaryModel): Promise<AiSessionSummaryModel | undefined> {
        return await getConnection().transaction(async transactionManager => {
            const repository = transactionManager.getRepository(AiSessionSummaryModel);
            return await repository.save(summary);
        });
    }
}