import { IAiSessionRepository } from "../Domain/Agent/AiSessionRepository";
import { AiSessionModel } from "../Domain/Agent/AiSession";
import { Context } from "@midwayjs/web";
export declare class AiSessionRepositoryMysql implements IAiSessionRepository {
    ctx: Context;
    constructor();
    findById(id: string): Promise<AiSessionModel | undefined>;
    save(info: AiSessionModel): Promise<AiSessionModel | undefined>;
}
