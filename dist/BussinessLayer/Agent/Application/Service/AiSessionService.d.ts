import { Context } from "@midwayjs/web";
import { AiSessionModel } from '../../Domain/Agent/AiSession';
import { IAiSessionRepository } from "../../Domain/Agent/AiSessionRepository";
export declare class AiSessionService {
    ctx: Context;
    aiSessionRepository: IAiSessionRepository;
    /**
     * 创建新的会话
     * @param command 创建参数
     * @returns 创建成功的会话实体
     */
    create(command: {
        sessionId?: string;
        workerId: string;
        businessType?: string;
        name?: string;
        ext?: any;
    }): Promise<AiSessionModel>;
    /**
     * 根据 ID 查询会话
     * @param id 会话 ID
     * @returns 查询到的会话或 null
     */
    findById(id: string): Promise<AiSessionModel | null>;
    /**
     * 更新会话信息
     * @param data 更新数据
     * @returns 更新后的会话
     */
    update(data: Partial<{
        id: string;
        sessionId?: string;
        workerId: string;
        businessType?: string;
        name?: string;
        ext?: any;
    }>): Promise<AiSessionModel | null>;
}
