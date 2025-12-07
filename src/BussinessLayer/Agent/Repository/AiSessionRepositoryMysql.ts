import { Inject, Provide } from "@midwayjs/core";
import { getRepository, getConnection } from "typeorm";
import { AI_SESSION, IAiSessionRepository } from "../Domain/Agent/AiSessionRepository";
import { AiSessionModel } from "../Domain/Agent/AiSession";
import { Context } from "@midwayjs/web";

@Provide(AI_SESSION)
export class AiSessionRepositoryMysql implements IAiSessionRepository {
    @Inject()
    ctx: Context

    constructor() { }

    async findById(id: string): Promise<AiSessionModel | undefined> {
        const repo = getRepository(AiSessionModel)
        const result: AiSessionModel = await repo.findOne({
            where: {
                id
            }
        })
        return result
    }

    async findByCurPwd(curPwd: string): Promise<AiSessionModel | undefined> {
        const repo = getRepository(AiSessionModel)
        const result: AiSessionModel = await repo.findOne({
            where: {
                curPwd
            }
        })
        return result
    }

    async save(info: AiSessionModel): Promise<AiSessionModel | undefined> {
        return await getConnection().transaction(async TransactionManager => {
            const repository = TransactionManager.getRepository(AiSessionModel)

            return await repository.save(info)
        })
    }
}

