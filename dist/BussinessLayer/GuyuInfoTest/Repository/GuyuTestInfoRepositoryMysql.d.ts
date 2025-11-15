import { IGuyuTestInfoRepository } from "../Domain/GuyuTestInfo/GuyuTestInfoRepository";
import { GuyuTestInfoModel } from "../Domain/GuyuTestInfo/GuyuTestInfoModel";
import { Context } from "@midwayjs/web";
export declare class GuyuTestInfoRepositoryMysql implements IGuyuTestInfoRepository {
    ctx: Context;
    constructor();
    findById(id: string): Promise<GuyuTestInfoModel | undefined>;
    save(info: GuyuTestInfoModel): Promise<GuyuTestInfoModel | undefined>;
}
