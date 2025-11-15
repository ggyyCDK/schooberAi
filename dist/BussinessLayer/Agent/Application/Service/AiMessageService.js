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
exports.AiMessageService = void 0;
const core_1 = require("@midwayjs/core");
const AiMessage_1 = require("../../Domain/Agent/AiMessage");
const AiMessageRepository_1 = require("../../Domain/Agent/AiMessageRepository");
let AiMessageService = class AiMessageService {
    /**
     * 创建消息
     */
    async createAiMessage(command) {
        try {
            const message = new AiMessage_1.AiMessageModel({
                sessionId: command.sessionId,
                fromType: command.fromType,
                messageContent: command.messageContent,
                workerId: command.workerId,
                ext: command.ext,
                llmConfig: command.llmConfig,
            });
            const result = await this.aiMessageRepository.save(message);
            this.ctx.logger.info(`创建消息成功: ${result === null || result === void 0 ? void 0 : result.id}`);
            return result;
        }
        catch (error) {
            this.ctx.logger.error(`创建消息失败: ${error.message}`, error);
            throw new Error(`创建消息失败: ${error.message}`);
        }
    }
    /**
     * 更新消息
     */
    async updateAiMessage(command) {
        const { id } = command;
        if (!id) {
            throw new Error('更新消息必须提供 id');
        }
        try {
            const existMessage = await this.aiMessageRepository.findById(id);
            if (!existMessage) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的消息，无法更新`);
                return null;
            }
            if (command.sessionId !== undefined)
                existMessage.sessionId = command.sessionId;
            if (command.fromType !== undefined)
                existMessage.fromType = command.fromType;
            if (command.messageContent !== undefined)
                existMessage.messageContent = command.messageContent;
            if (command.workerId !== undefined)
                existMessage.workerId = command.workerId;
            if (command.ext !== undefined)
                existMessage.ext = command.ext;
            if (command.llmConfig !== undefined)
                existMessage.llmConfig = command.llmConfig;
            const result = await this.aiMessageRepository.save(existMessage);
            this.ctx.logger.info(`更新消息成功: ${id}`);
            return result;
        }
        catch (error) {
            this.ctx.logger.error(`更新消息失败: ${error.message}`, error);
            throw new Error(`更新消息失败: ${error.message}`);
        }
    }
    /**
     * 根据 ID 查询消息
     */
    async findById(id) {
        try {
            const result = await this.aiMessageRepository.findById(id);
            if (!result) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的消息`);
                return null;
            }
            this.ctx.logger.info(`查询消息成功: ${id}`);
            return result;
        }
        catch (error) {
            this.ctx.logger.error(`查询消息失败: ${error.message}`, error);
            throw new Error(`查询消息失败: ${error.message}`);
        }
    }
    /**
     * 根据 sessionId 查询消息列表
     */
    async listBySessionId(sessionId) {
        try {
            const result = await this.aiMessageRepository.listBySessionId(sessionId);
            this.ctx.logger.info(`查询 sessionId 为 ${sessionId} 的消息，共 ${result.length} 条`);
            return result;
        }
        catch (error) {
            this.ctx.logger.error(`查询消息列表失败: ${error.message}`, error);
            throw new Error(`查询消息列表失败: ${error.message}`);
        }
    }
    /**
     * 根据 sessionId 删除消息
     */
    async deleteMessageBySessionId(sessionId) {
        try {
            const deleted = await this.aiMessageRepository.deleteMessageBySessionId(sessionId);
            this.ctx.logger.info(`删除 sessionId 为 ${sessionId} 的消息结果: ${deleted}`);
            return deleted;
        }
        catch (error) {
            this.ctx.logger.error(`删除消息失败: ${error.message}`, error);
            throw new Error(`删除消息失败: ${error.message}`);
        }
    }
};
exports.AiMessageService = AiMessageService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], AiMessageService.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(AiMessageRepository_1.AI_MESSAGE),
    __metadata("design:type", Object)
], AiMessageService.prototype, "aiMessageRepository", void 0);
exports.AiMessageService = AiMessageService = __decorate([
    (0, core_1.Provide)()
], AiMessageService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlNZXNzYWdlU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9CdXNzaW5lc3NMYXllci9BZ2VudC9BcHBsaWNhdGlvbi9TZXJ2aWNlL0FpTWVzc2FnZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWlEO0FBRWpELDREQUE4RDtBQUM5RCxnRkFBMEY7QUFJbkYsSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBZ0I7SUFPekI7O09BRUc7SUFDSCxLQUFLLENBQUMsZUFBZSxDQUFDLE9BT3JCO1FBQ0csSUFBSSxDQUFDO1lBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSwwQkFBYyxDQUFDO2dCQUMvQixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7Z0JBQzVCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtnQkFDMUIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxjQUFjO2dCQUN0QyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7Z0JBQzFCLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztnQkFDaEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTO2FBQy9CLENBQUMsQ0FBQztZQUVILE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5QyxPQUFPLE1BQU8sQ0FBQztRQUNuQixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN6RCxNQUFNLElBQUks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