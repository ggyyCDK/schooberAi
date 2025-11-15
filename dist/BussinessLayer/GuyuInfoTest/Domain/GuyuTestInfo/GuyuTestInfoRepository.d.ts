import { Repository } from "../../../../Shared/SeedWork/Respository";
import { GuyuTestInfoModel } from "./GuyuTestInfoModel";
export declare const GUYU_TEST_INFO = "GUYU_TEST_INFO";
export interface IGuyuTestInfoRepository extends Repository<GuyuTestInfoModel> {
    findById(id: string): Promise<GuyuTestInfoModel | null>;
    save(aggregator: GuyuTestInfoModel): Promise<GuyuTestInfoModel | undefined>;
}
