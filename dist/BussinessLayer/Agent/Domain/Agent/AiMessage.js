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
exports.AiMessageModel = void 0;
const typeorm_1 = require("typeorm");
const AggregateRoots_1 = require("../../../../Shared/SeedWork/AggregateRoots");
let AiMessageModel = class AiMessageModel extends AggregateRoots_1.AggregateRoot {
    constructor(options) {
        super();
        if (options) {
            if (options.sessionId)
                this.sessionId = options.sessionId;
            if (options.fromType)
                this.fromType = options.fromType;
            if (options.messageContent)
                this.messageContent = options.messageContent;
            if (options.workerId)
                this.workerId = options.workerId;
            if (options.ext)
                this.ext = options.ext;
            if (options.llmConfig)
                this.llmConfig = options.llmConfig;
        }
    }
};
exports.AiMessageModel = AiMessageModel;
__decorate([
    (0, typeorm_1.Column)({
        name: 'session_id',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '关联的会话 ID'
    }),
    __metadata("design:type", String)
], AiMessageModel.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'from_type',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '消息来源类型（用户/AI 等）'
    }),
    __metadata("design:type", String)
], AiMessageModel.prototype, "fromType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'message_content',
        type: 'json',
        nullable: true,
        comment: '消息内容'
    }),
    __metadata("design:type", Array)
], AiMessageModel.prototype, "messageContent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'worker_id',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '工作者 ID'
    }),
    __metadata("design:type", String)
], AiMessageModel.prototype, "workerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ext',
        type: 'json',
        nullable: true,
        comment: '扩展字段'
    }),
    __metadata("design:type", Object)
], AiMessageModel.prototype, "ext", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'llm_config',
        type: 'json',
        nullable: true,
        comment: '大模型配置'
    }),
    __metadata("design:type", Object)
], AiMessageModel.prototype, "llmConfig", void 0);
exports.AiMessageModel = AiMessageModel = __decorate([
    (0, typeorm_1.Entity)('ai_message'),
    __metadata("design:paramtypes", [Object])
], AiMessageModel);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL0J1c3NpbmVzc0xheWVyL0FnZW50L0RvbWFpbi9BZ2VudC9BaU1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXlDO0FBQ3pDLHFFQUFpRTtBQUkxRCxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFlLFNBQVEsOEJBQWE7SUFFN0MsWUFBWSxPQU9YO1FBQ0csS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxPQUFPLENBQUMsU0FBUztnQkFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDMUQsSUFBSSxPQUFPLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDdkQsSUFBSSxPQUFPLENBQUMsY0FBYztnQkFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUM7WUFDekUsSUFBSSxPQUFPLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDdkQsSUFBSSxPQUFPLENBQUMsR0FBRztnQkFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDeEMsSUFBSSxPQUFPLENBQUMsU0FBUztnQkFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDOUQsQ0FBQztJQUNMLENBQUM7Q0FxREosQ0FBQTtBQXhFWSx3Q0FBYztBQTRCdkI7SUFQQyxJQUFBLGdCQUFNLEVBQUM7UUFDSixJQUFJLEVBQUUsWUFBWTtRQUNsQixJQUFJLEVBQUUsU0FBUztRQUNmLE1BQU0sRUFBRSxHQUFHO1FBQ1gsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsVUFBVTtLQUN0QixDQUFDOztpREFDaUI7QUFTbkI7SUFQQyxJQUFBLGdCQUFNLEVBQUM7UUFDSixJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsU0FBUztRQUNmLE1BQU0sRUFBRSxHQUFHO1FBQ1gsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsaUJBQWlCO0tBQzdCLENBQUM7O2dEQUNnQjtBQVFsQjtJQU5DLElBQUEsZ0JBQU0sRUFBQztRQUNKLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7O3NEQUMwQjtBQVM1QjtJQVBDLElBQUEsZ0JBQU0sRUFBQztRQUNKLElBQUksRUFBRSxXQUFXO1FBQ2pCLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTSxFQUFFLEdBQUc7UUFDWCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxRQUFRO0tBQ3BCLENBQUM7O2dEQUNnQjtBQVFsQjtJQU5DLElBQUEsZ0JBQU0sRUFBQztRQUNKLElBQUksRUFBRSxLQUFLO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzJDQUNRO0FBUVY7SUFOQyxJQUFBLGdCQUFNLEVBQUM7UUFDSixJQUFJLEVBQUUsWUFBWTtRQUNsQixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLE9BQU87S0FDbkIsQ0FBQzs7aURBQ2M7eUJBdEVQLGNBQWM7SUFEMUIsSUFBQSxnQkFBTSxFQUFDLFlBQVksQ0FBQzs7R0FDUixjQUFjLENBd0UxQiJ9