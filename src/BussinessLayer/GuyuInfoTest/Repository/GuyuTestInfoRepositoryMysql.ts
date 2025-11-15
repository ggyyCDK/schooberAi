import { Inject, Provide } from "@midwayjs/core";
import { getRepository, getConnection } from "typeorm";
import { GUYU_TEST_INFO, IGuyuTestInfoRepository } from "../Domain/GuyuTestInfo/GuyuTestInfoRepository";
import { GuyuTestInfoModel } from "../Domain/GuyuTestInfo/GuyuTestInfoModel";
import { Context } from "@midwayjs/web";

@Provide(GUYU_TEST_INFO)

export class GuyuTestInfoRepositoryMysql implements IGuyuTestInfoRepository {
    @Inject()
    ctx: Context
    constructor() { }

    async findById(id: string): Promise<GuyuTestInfoModel | undefined> {
        const repo = getRepository(GuyuTestInfoModel)
        const result: GuyuTestInfoModel = await repo.findOne({
            where: {
                id
            }
        })
        return result
    }

    async save(info: GuyuTestInfoModel): Promise<GuyuTestInfoModel | undefined> {
        return await getConnection().transaction(async TransactionManager => {
            const repository = TransactionManager.getRepository(GuyuTestInfoModel)

            return await repository.save(info)
        })

    }
}