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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentController = void 0;
const core_1 = require("@midwayjs/core");
const swagger_1 = require("@midwayjs/swagger");
const AgentRunRequestDTO_1 = require("./RequestDTO/AgentRunRequestDTO");
const AgentService_1 = require("../../BussinessLayer/Agent/Application/Service/AgentService");
let AgentController = class AgentController {
    async run(body) {
        const { variableMaps, sessionId, question, workerId } = body;
        const { res } = this.ctx;
        // 设置SSE响应头
        res.writeHead(200, {
            'Content-Type': 'text/event-stream', // 表示响应的内容类型是SSE格式的文本流
            'X-Accel-Buffering': 'no', // 表示响应的内容不应该被缓存，以保证实时性
            'Cache-Control': 'no-cache', // 表示响应的内容不应该被缓存，以保证实时性
            'Connection': 'keep-alive' //表示响应的连接应该保持打开，以便服务器端持续发送数据。 通常，客户端的请求中会包含特殊的头信息："Accept: text/event-stream" ，表示客户端系统接收 SSE 数据
        });
        res.flushHeaders();
        await this.agentService.run({
            variableMaps, sessionId, question, workerId
        });
    }
};
exports.AgentController = AgentController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], AgentController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", AgentService_1.AgentService)
], AgentController.prototype, "agentService", void 0);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Agent聊天', description: 'Agent聊天' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '代码审查执行成功',
    }),
    (0, core_1.Post)('/run'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AgentRunRequestDTO_1.AgentRunRequestDTO]),
    __metadata("design:returntype", Promise)
], AgentController.prototype, "run", null);
exports.AgentController = AgentController = __decorate([
    (0, swagger_1.ApiTags)(['Agent服务']),
    (0, core_1.Controller)('/api/v1/agent')
], AgentController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbnRDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0FwaUdhdGV3YXkvYWlDb250cm9sbGVyL0FnZW50Q29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBZ0U7QUFFaEUsK0NBQXVFO0FBQ3ZFLHdFQUFxRTtBQUNyRSwwRkFBc0Y7QUFJL0UsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQWFwQixBQUFOLEtBQUssQ0FBQyxHQUFHLENBQVMsSUFBd0I7UUFDeEMsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztRQUM3RCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN6QixXQUFXO1FBQ1gsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDakIsY0FBYyxFQUFFLG1CQUFtQixFQUFFLHNCQUFzQjtZQUMzRCxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsdUJBQXVCO1lBQ2xELGVBQWUsRUFBRSxVQUFVLEVBQUUsdUJBQXVCO1lBQ3BELFlBQVksRUFBRSxZQUFZLENBQUMsK0ZBQStGO1NBQzNILENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuQixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1lBQzFCLFlBQVksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVE7U0FDNUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUE7QUE1QlksMENBQWU7QUFFMUI7SUFEQyxJQUFBLGFBQU0sR0FBRTs7NENBQ0k7QUFHYjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNLLDJCQUFZO3FEQUFBO0FBUXBCO0lBTkwsSUFBQSxzQkFBWSxFQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDNUQsSUFBQSxxQkFBVyxFQUFDO1FBQ1gsTUFBTSxFQUFFLEdBQUc7UUFDWCxXQUFXLEVBQUUsVUFBVTtLQUN4QixDQUFDO0lBQ0QsSUFBQSxXQUFJLEVBQUMsTUFBTSxDQUFDO0lBQ0YsV0FBQSxJQUFBLFdBQUksR0FBRSxDQUFBOztxQ0FBTyx1Q0FBa0I7OzBDQWN6QzswQkEzQlUsZUFBZTtJQUYzQixJQUFBLGlCQUFPLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQixJQUFBLGlCQUFVLEVBQUMsZUFBZSxDQUFDO0dBQ2YsZUFBZSxDQTRCM0IifQ==