"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiSessionService = void 0;
const core_1 = require("@midwayjs/core");
const AiSession_1 = require("../../Domain/Agent/AiSession");
const AiSessionRepository_1 = require("../../Domain/Agent/AiSessionRepository");
let AiSessionService = class AiSessionService {
    /**
     * 创建新的会话
     * @param command 创建参数
     * @returns 创建成功的会话实体
     */
    async create(command) {
        try {
            const { sessionId, workerId, businessType, name, ext } = command;
            // 创建新的会话实体
            const aiSession = new AiSession_1.AiSessionModel({
                sessionId,
                workerId,
                businessType,
                name,
                ext,
            });
            // 保存到数据库
            const result = await this.aiSessionRepository.save(aiSession);
            this.ctx.logger.info(`创建会话成功: ${result === null || result === void 0 ? void 0 : result.id}`);
            return result;
        }
        catch (error) {
            this.ctx.logger.error(`创建会话失败: ${error.message}`, error);
            throw new Error(`创建会话失败: ${error.message}`);
        }
    }
    /**
     * 根据 ID 查询会话
     * @param id 会话 ID
     * @returns 查询到的会话或 null
     */
    async findById(id) {
        try {
            const result = await this.aiSessionRepository.findById(id);
            if (!result) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的会话`);
                return null;
            }
            this.ctx.logger.info(`查询会话成功: ${id}`);
            return result;
        }
        catch (error) {
            this.ctx.logger.error(`查询会话失败: ${error.message}`, error);
            throw new Error(`查询会话失败: ${error.message}`);
        }
    }
    /**
     * 更新会话信息
     * @param data 更新数据
     * @returns 更新后的会话
     */
    async update(data) {
        const { id } = data;
        try {
            // 先查询是否存在
            const existSession = await this.aiSessionRepository.findById(id);
            if (!existSession) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的会话，无法更新`);
                return null;
            }
            // 更新字段
            if (data.sessionId !== undefined)
                existSession.id = data.sessionId;
            if (data.workerId !== undefined)
                existSession.workerId = data.workerId;
            if (data.businessType !== undefined)
                existSession.businessType = data.businessType;
            if (data.name !== undefined)
                existSession.name = data.name;
            if (data.ext !== undefined)
                existSession.ext = data.ext;
            // 保存更新
            const result = await this.aiSessionRepository.save(existSession);
            this.ctx.logger.info(`更新会话成功: ${id}`);
            return result;
        }
        catch (error) {
            this.ctx.logger.error(`更新会话失败: ${error.message}`, error);
            throw new Error(`更新会话失败: ${error.message}`);
        }
    }
};
exports.AiSessionService = AiSessionService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], AiSessionService.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(AiSessionRepository_1.AI_SESSION),
    __metadata("design:type", Object)
], AiSessionService.prototype, "aiSessionRepository", void 0);
exports.AiSessionService = AiSessionService = __decorate([
    (0, core_1.Provide)()
], AiSessionService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlTZXNzaW9uU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9CdXNzaW5lc3NMYXllci9BZ2VudC9BcHBsaWNhdGlvbi9TZXJ2aWNlL0FpU2Vzc2lvblNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWlEO0FBRWpELDREQUE4RDtBQUM5RCxnRkFBMEY7QUFHbkYsSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBZ0I7SUFPekI7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsT0FNWjtRQUNHLElBQUksQ0FBQztZQUNELE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBRWpFLFdBQVc7WUFDWCxNQUFNLFNBQVMsR0FBRyxJQUFJLDBCQUFjLENBQUM7Z0JBQ2pDLFNBQVM7Z0JBQ1QsUUFBUTtnQkFDUixZQUFZO2dCQUNaLElBQUk7Z0JBQ0osR0FBRzthQUNOLENBQUMsQ0FBQztZQUVILFNBQVM7WUFDVCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUMsT0FBTyxNQUFPLENBQUM7UUFDbkIsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssQ0FBQyxPQUFPLEVBQUUs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