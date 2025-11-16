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
exports.AiChatService = exports.AI_STUDIO_AI_CHAT = void 0;
const core_1 = require("@midwayjs/core");
const axios_1 = require("axios");
// import OpenAI from 'openai'
const parse_1 = require("../../../../Helper/ParseSSE/parse");
const parseResult_1 = require("../../../../Helper/ParseSSE/parseResult");
const parseResult_2 = require("../../../../Helper/Types/parseResult");
exports.AI_STUDIO_AI_CHAT = 'AI_STUDIO_AI_CHAT';
let AiChatService = class AiChatService {
    buildRequestParam(command) {
        const requestParams = {
            model: command.model,
            messages: command.messages,
            temperature: command.temperature,
            max_tokens: command.max_tokens,
        };
        if (command.timeout) {
            requestParams.timeout = command.timeout;
        }
        if (command.stream) {
            requestParams.stream = command.stream;
        }
        return requestParams;
    }
    //流式调用接口
    async aiChatWithStream(command) {
        var _a, _b;
        this.ctx.logger.info(`开始调用AI服务, model: ${command.model}, messages: ${JSON.stringify(command.messages)}`);
        let ak = (_a = command.ak) !== null && _a !== void 0 ? _a : '';
        if (!ak) {
            throw new Error('ak is required');
        }
        //构建请求参数
        const requestParams = this.buildRequestParam(command);
        //记录模型开始时间
        // const startTime = Date.now()
        //大模型输出构建
        let response;
        try {
            response = await axios_1.default.post('https://idealab.alibaba-inc.com/api/openai/v1/chat/completions', requestParams, {
                timeout: (_b = command.timeout) !== null && _b !== void 0 ? _b : 5 * 60 * 1000,
                headers: {
                    Authorization: `Bearer ${ak}`
                },
                responseType: 'stream'
            }).catch(err => {
                throw new Error(`失败原因:${err}`);
            });
        }
        catch (error) {
            throw new Error(`大模型流式调用失败:${error}`);
        }
        const stream = response.data;
        for await (const chunk of stream) {
            const onChunk = (0, parse_1.getLines)((0, parse_1.getMessages)(msg => {
                const parseResult = (0, parseResult_1.parseSreamResponse)(msg);
                if (parseResult.eventType === parseResult_2.EventType.Complete) {
                    (command === null || command === void 0 ? void 0 : command.onCompleted) && (command === null || command === void 0 ? void 0 : command.onCompleted(parseResult));
                }
                if (parseResult.eventType === parseResult_2.EventType.Message) {
                    (command === null || command === void 0 ? void 0 : command.onMessage) && (command === null || command === void 0 ? void 0 : command.onMessage(parseResult));
                }
            }));
            onChunk(chunk);
        }
    }
};
exports.AiChatService = AiChatService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], AiChatService.prototype, "ctx", void 0);
exports.AiChatService = AiChatService = __decorate([
    (0, core_1.Provide)(exports.AI_STUDIO_AI_CHAT)
], AiChatService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlDaGF0U2VydmljZSBjb3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL0J1c3NpbmVzc0xheWVyL0FnZW50L0FwcGxpY2F0aW9uL1NlcnZpY2UvQWlDaGF0U2VydmljZSBjb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFpRDtBQUdqRCxpQ0FBeUI7QUFDekIsOEJBQThCO0FBQzlCLG1EQUErRDtBQUMvRCwrREFBa0U7QUFDbEUsNERBQXVEO0FBQzFDLFFBQUEsaUJBQWlCLEdBQUcsbUJBQW1CLENBQUE7QUFFN0MsSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYTtJQUtkLGlCQUFpQixDQUFDLE9BQTJCO1FBQ2pELE1BQU0sYUFBYSxHQUF3QjtZQUN2QyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVU7U0FDakMsQ0FBQTtRQUNELElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xCLGFBQWEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM1QyxDQUFDO1FBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakIsYUFBYSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzFDLENBQUM7UUFDRCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBR0QsUUFBUTtJQUNSLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFpQzs7UUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNoQixvQkFBb0IsT0FBTyxDQUFDLEtBQUssZUFBZSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUNyRixDQUFBO1FBRUQsSUFBSSxFQUFFLEdBQVcsTUFBQSxPQUFPLENBQUMsRUFBRSxtQ0FBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxRQUFRO1FBQ1IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXRELFVBQVU7UUFDViwrQkFBK0I7UUFFL0IsU0FBUztRQUNULElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxDQUFDO1lBQ0QsUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FDdkIsZ0VBQWdFLEVBQ2hFLGFBQWEsRUFBRTtnQkFDZixPQUFPLEVBQUUsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUk7Z0JBQ3pDLE9BQU8sRUFBRTtvQkFDTCxhQUFhLEVBQUUsVUFBVSxFQUFFLEVBQUU7aUJBQ2hDO2dCQUNELFlBQVksRUFBRSxRQUFRO2FBQ3pCLENBQ0EsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUE7WUFDbEMsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ3pDLENBQUM7UUFDRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRTdCLElBQUksS0FBSyxFQUFFLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBRS9CLE1BQU0sT0FBTyxHQUFHLElBQUEsZ0JBQVEsRUFDcEIsSUFBQSxtQkFBVyxFQUNQLEdBQUcsQ0FBQyxFQUFFO2dCQUNGLE1BQU0sV0FBVyxHQUFHLElBQUEsZ0NBQWtCLEVBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTVDLElBQUksV0FBVyxDQUFDLFNBQVMsS0FBSyx1QkFBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUMvQyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLE1BQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFBO2dCQUM3RCxDQUFDO2dCQUNELElBQUksV0FBVyxDQUFDLFNBQVMsS0FBSyx1QkFBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUM5QyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxTQUFTLE1BQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFBO2dCQUN6RCxDQUFDO1lBQ0wsQ0FBQyxDQUNKLENBQ0osQ0FBQTtZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNsQixDQUFDO0lBQ0wsQ0FBQztDQUVKLENBQUE7QUEvRVksc0NBQWE7QUFHdEI7SUFEQyxJQUFBLGFBQU0sR0FBRTs7MENBQ0k7d0JBSEosYUFBYTtJQUR6QixJQUFBLGNBQU8sRUFBQyx5QkFBaUIsQ0FBQztHQUNkLGFBQWEsQ0ErRXpCIn0=