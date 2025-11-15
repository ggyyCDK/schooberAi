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
exports.CodeReviewAgentService = void 0;
const core_1 = require("@midwayjs/core");
const codeReviewAgents_1 = require("../../../../BussinessLayer/CodeReview/Mastra/agents/codeReviewAgents");
let CodeReviewAgentService = class CodeReviewAgentService {
    async startCodeReviewAgent(workDir, question, stream) {
        const codeReviewAgent = await (0, codeReviewAgents_1.codeReviewAgentFactory)();
        console.log('codeReviewAgent', codeReviewAgent);
        console.log('workDir:', workDir);
        console.log('question:', question);
        console.log('stream:', stream);
        const userQA = [
            question
        ];
        const steamData = await codeReviewAgent.streamVNext([{ role: 'user', content: userQA.join('\n') }], {
            maxSteps: 10,
            maxRetries: 3,
            onStepFinish: async ({ text, toolCalls, toolResults, usage }) => {
                this.ctx.logger.info(`Step finish: ${text}`);
                this.ctx.logger.info(`Tool calls: ${toolCalls}`);
                this.ctx.logger.info(`Tool results: ${toolResults}`);
                this.ctx.logger.info(`Usage: ${usage}`);
            }
        });
        for await (const chunk of steamData) {
            const { type, from, payload } = chunk;
            const messageOutput = {
                type,
                from,
                payload
            };
            if (type === 'text-delta' || type === 'tool-result' || type === 'tool-call') {
                messageOutput.payload = payload;
            }
            else {
                messageOutput.payload = null;
            }
            this.ctx.res.write('data: ' + JSON.stringify(messageOutput) + '\n\n');
            this.ctx.logger.info(`Message output: ${JSON.stringify(messageOutput)}`);
        }
    }
};
exports.CodeReviewAgentService = CodeReviewAgentService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], CodeReviewAgentService.prototype, "ctx", void 0);
exports.CodeReviewAgentService = CodeReviewAgentService = __decorate([
    (0, core_1.Provide)()
], CodeReviewAgentService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZVJldmlld0FnZW50U2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9CdXNzaW5lc3NMYXllci9Db2RlUmV2aWV3L0FwcGxpY2F0aW9uL3NlcnZpY2UvY29kZVJldmlld0FnZW50U2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUQ7QUFFakQsaUdBQW9HO0FBRTdGLElBQU0sc0JBQXNCLEdBQTVCLE1BQU0sc0JBQXNCO0lBSS9CLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUFlLEVBQUUsUUFBZ0IsRUFBRSxNQUFlO1FBQ3pFLE1BQU0sZUFBZSxHQUFHLE1BQU0sSUFBQSx5Q0FBc0IsR0FBRSxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0IsTUFBTSxNQUFNLEdBQUc7WUFDWCxRQUFRO1NBQ1gsQ0FBQTtRQUNELE1BQU0sU0FBUyxHQUFHLE1BQU0sZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDaEcsUUFBUSxFQUFFLEVBQUU7WUFDWixVQUFVLEVBQUUsQ0FBQztZQUNiLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO2dCQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM1QyxDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLEVBQUUsTUFBTSxLQUFLLElBQUksU0FBUyxFQUFFLENBQUM7WUFDbEMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBQ3RDLE1BQU0sYUFBYSxHQUFHO2dCQUNsQixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osT0FBTzthQUNWLENBQUE7WUFDRCxJQUFJLElBQUksS0FBSyxZQUFZLElBQUksSUFBSSxLQUFLLGFBQWEsSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFLENBQUM7Z0JBQzFFLGFBQWEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3BDLENBQUM7aUJBQU0sQ0FBQztnQkFDSixhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNqQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0UsQ0FBQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBdkNZLHdEQUFzQjtBQUUvQjtJQURDLElBQUEsYUFBTSxHQUFFOzttREFDSTtpQ0FGSixzQkFBc0I7SUFEbEMsSUFBQSxjQUFPLEdBQUU7R0FDRyxzQkFBc0IsQ0F1Q2xDIn0=