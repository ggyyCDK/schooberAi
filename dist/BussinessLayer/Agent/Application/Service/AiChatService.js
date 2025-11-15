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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlDaGF0U2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9CdXNzaW5lc3NMYXllci9BZ2VudC9BcHBsaWNhdGlvbi9TZXJ2aWNlL0FpQ2hhdFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQWlEO0FBR2pELGlDQUF5QjtBQUN6QixtREFBK0Q7QUFDL0QsK0RBQWtFO0FBQ2xFLDREQUF1RDtBQUMxQyxRQUFBLGlCQUFpQixHQUFHLG1CQUFtQixDQUFBO0FBRTdDLElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFLZCxpQkFBaUIsQ0FBQyxPQUEyQjtRQUNqRCxNQUFNLGFBQWEsR0FBd0I7WUFDdkMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUMxQixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO1NBQ2pDLENBQUE7UUFDRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQixhQUFhLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDNUMsQ0FBQztRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLGFBQWEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxDQUFDO1FBQ0QsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUdELFFBQVE7SUFDUixLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBaUM7O1FBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDaEIsb0JBQW9CLE9BQU8sQ0FBQyxLQUFLLGVBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FDckYsQ0FBQTtRQUVELElBQUksRUFBRSxHQUFXLE1BQUEsT0FBTyxDQUFDLEVBQUUsbUNBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsUUFBUTtRQUNSLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0RCxVQUFVO1FBQ1YsK0JBQStCO1FBRS9CLFNBQVM7UUFDVCxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksQ0FBQztZQUNELFFBQVEsR0FBRyxNQUFNLGVBQUssQ0FBQyxJQUFJLENBQ3ZCLGdFQUFnRSxFQUNoRSxhQUFhLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLE1BQUEsT0FBTyxDQUFDLE9BQU8sbUNBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJO2dCQUN6QyxPQUFPLEVBQUU7b0JBQ0wsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFO2lCQUNoQztnQkFDRCxZQUFZLEVBQUUsUUFBUTthQUN6QixDQUNBLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFBO1lBQ2xDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUN6QyxDQUFDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUU3QixJQUFJLEtBQUssRUFBRSxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUUvQixNQUFNLE9BQU8sR0FBRyxJQUFBLGdCQUFRLEVBQ3BCLElBQUEsbUJBQVcsRUFDUCxHQUFHLENBQUMsRUFBRTtnQkFDRixNQUFNLFdBQVcsR0FBRyxJQUFBLGdDQUFrQixFQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssdUJBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDL0MsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsV0FBVyxNQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQTtnQkFDN0QsQ0FBQztnQkFDRCxJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssdUJBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDOUMsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsU0FBUyxNQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQTtnQkFDekQsQ0FBQztZQUNMLENBQUMsQ0FDSixDQUNKLENBQUE7WUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbEIsQ0FBQztJQUNMLENBQUM7Q0FFSixDQUFBO0FBL0VZLHNDQUFhO0FBR3RCO0lBREMsSUFBQSxhQUFNLEdBQUU7OzBDQUNJO3dCQUhKLGFBQWE7SUFEekIsSUFBQSxjQUFPLEVBQUMseUJBQWlCLENBQUM7R0FDZCxhQUFhLENBK0V6QiJ9