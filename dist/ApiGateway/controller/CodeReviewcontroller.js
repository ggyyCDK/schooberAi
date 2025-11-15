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
exports.APIController = void 0;
const core_1 = require("@midwayjs/core");
const swagger_1 = require("@midwayjs/swagger");
const codeReviewRequestDTO_1 = require("./RequestDTO/codeReviewRequestDTO");
const codeReviewAgentService_1 = require("../../BussinessLayer/CodeReview/Application/service/codeReviewAgentService");
let APIController = class APIController {
    async runUser(body) {
        const { variableMaps } = body;
        const { workDir, question, stream } = variableMaps;
        // const result = await this.codeReviewAgentService.startCodeReviewAgent(workDir, question, stream);
        // return { success: true, message: 'OK', result };
        const { res } = this.ctx;
        // 设置SSE响应头
        res.writeHead(200, {
            'Content-Type': 'text/event-stream', // 表示响应的内容类型是SSE格式的文本流
            'X-Accel-Buffering': 'no', // 表示响应的内容不应该被缓存，以保证实时性
            'Cache-Control': 'no-cache', // 表示响应的内容不应该被缓存，以保证实时性
            'Connection': 'keep-alive' //表示响应的连接应该保持打开，以便服务器端持续发送数据。 通常，客户端的请求中会包含特殊的头信息："Accept: text/event-stream" ，表示客户端系统接收 SSE 数据
        });
        res.flushHeaders();
        await this.codeReviewAgentService.startCodeReviewAgent(workDir, question, stream);
    }
};
exports.APIController = APIController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], APIController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", codeReviewAgentService_1.CodeReviewAgentService)
], APIController.prototype, "codeReviewAgentService", void 0);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '运行代码审查', description: '执行代码审查任务' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '代码审查执行成功',
    }),
    (0, core_1.Post)('/runUser'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [codeReviewRequestDTO_1.CodeReviewDto]),
    __metadata("design:returntype", Promise)
], APIController.prototype, "runUser", null);
exports.APIController = APIController = __decorate([
    (0, swagger_1.ApiTags)(['代码审查']),
    (0, core_1.Controller)('/api/v1/code-review')
], APIController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29kZVJldmlld2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQXBpR2F0ZXdheS9jb250cm9sbGVyL0NvZGVSZXZpZXdjb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFnRTtBQUVoRSwrQ0FBdUU7QUFDdkUsNEVBQWtFO0FBQ2xFLG1IQUFnSDtBQUt6RyxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBWWxCLEFBQU4sS0FBSyxDQUFDLE9BQU8sQ0FBUyxJQUFtQjtRQUN2QyxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQzlCLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLFlBQVksQ0FBQztRQUNuRCxvR0FBb0c7UUFDcEcsbURBQW1EO1FBQ25ELE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3pCLFdBQVc7UUFDWCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNqQixjQUFjLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCO1lBQzNELG1CQUFtQixFQUFFLElBQUksRUFBRSx1QkFBdUI7WUFDbEQsZUFBZSxFQUFFLFVBQVUsRUFBRSx1QkFBdUI7WUFDcEQsWUFBWSxFQUFFLFlBQVksQ0FBQywrRkFBK0Y7U0FDM0gsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25CLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEYsQ0FBQztDQUNGLENBQUE7QUE1Qlksc0NBQWE7QUFFeEI7SUFEQyxJQUFBLGFBQU0sR0FBRTs7MENBQ0k7QUFFYjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNlLCtDQUFzQjs2REFBQztBQVF6QztJQU5MLElBQUEsc0JBQVksRUFBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQzVELElBQUEscUJBQVcsRUFBQztRQUNYLE1BQU0sRUFBRSxHQUFHO1FBQ1gsV0FBVyxFQUFFLFVBQVU7S0FDeEIsQ0FBQztJQUNELElBQUEsV0FBSSxFQUFDLFVBQVUsQ0FBQztJQUNGLFdBQUEsSUFBQSxXQUFJLEdBQUUsQ0FBQTs7cUNBQU8sb0NBQWE7OzRDQWV4Qzt3QkEzQlUsYUFBYTtJQUZ6QixJQUFBLGlCQUFPLEVBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQixJQUFBLGlCQUFVLEVBQUMscUJBQXFCLENBQUM7R0FDckIsYUFBYSxDQTRCekIifQ==