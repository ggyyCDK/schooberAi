import { Inject, Provide } from "@midwayjs/core";
import { Context } from "@midwayjs/web";
import { AiSessionModel } from '../../Domain/Agent/AiSession';
import { AI_SESSION, IAiSessionRepository } from "../../Domain/Agent/AiSessionRepository";

@Provide()
export class AiSessionService {
    @Inject()
    ctx: Context;

    @Inject(AI_SESSION)
    aiSessionRepository: IAiSessionRepository;

    /**
     * 创建新的会话
     * @param command 创建参数
     * @returns 创建成功的会话实体
     */
    async create(command: {
        sessionId?: string;
        workerId: string;
        businessType?: string;
        name?: string;
        ext?: any;
    }): Promise<AiSessionModel> {
        try {
            const { sessionId, workerId, businessType, name, ext } = command;
            
            // 创建新的会话实体
            const aiSession = new AiSessionModel({
                sessionId,
                workerId,
                businessType,
                name,
                ext,
            });

            // 保存到数据库
            const result = await this.aiSessionRepository.save(aiSession);

            this.ctx.logger.info(`创建会话成功: ${result?.id}`);
            return result!;
        } catch (error) {
            this.ctx.logger.error(`创建会话失败: ${error.message}`, error);
            throw new Error(`创建会话失败: ${error.message}`);
        }
    }

    /**
     * 根据 ID 查询会话
     * @param id 会话 ID
     * @returns 查询到的会话或 null
     */
    async findById(id: string): Promise<AiSessionModel | null> {
        try {
            const result = await this.aiSessionRepository.findById(id);

            if (!result) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的会话`);
                return null;
            }

            this.ctx.logger.info(`查询会话成功: ${id}`);
            return result;
        } catch (error) {
            this.ctx.logger.error(`查询会话失败: ${error.message}`, error);
            throw new Error(`查询会话失败: ${error.message}`);
        }
    }

    /**
     * 更新会话信息
     * @param data 更新数据
     * @returns 更新后的会话
     */
    async update(data: Partial<{
        id: string;
        sessionId?: string;
        workerId: string;
        businessType?: string;
        name?: string;
        ext?: any;
    }>): Promise<AiSessionModel | null> {
        const { id } = data;
        
        try {
            // 先查询是否存在
            const existSession = await this.aiSessionRepository.findById(id!);

            if (!existSession) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的会话，无法更新`);
                return null;
            }

            // 更新字段
            if (data.sessionId !== undefined) existSession.id = data.sessionId;
            if (data.workerId !== undefined) existSession.workerId = data.workerId;
            if (data.businessType !== undefined) existSession.businessType = data.businessType;
            if (data.name !== undefined) existSession.name = data.name;
            if (data.ext !== undefined) existSession.ext = data.ext;

            // 保存更新
            const result = await this.aiSessionRepository.save(existSession);

            this.ctx.logger.info(`更新会话成功: ${id}`);
            return result!;
        } catch (error) {
            this.ctx.logger.error(`更新会话失败: ${error.message}`, error);
            throw new Error(`更新会话失败: ${error.message}`);
        }
    }

}