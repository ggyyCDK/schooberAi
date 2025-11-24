import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { codeReviewAgentFactory } from '@/BussinessLayer/AiSummary/Mastra/agents/codeReviewAgents';
@Provide()
export class CodeReviewAgentService {
    @Inject()
    ctx: Context;

    async startCodeReviewAgent(workDir: string, question: string, stream: boolean) {
        const codeReviewAgent = await codeReviewAgentFactory();
        console.log('codeReviewAgent', codeReviewAgent);
        console.log('workDir:', workDir);
        console.log('question:', question);
        console.log('stream:', stream);
        const userQA = [
            question
        ]
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
            }
            if (type === 'text-delta' || type === 'tool-result' || type === 'tool-call') {
                messageOutput.payload = payload;
            } else {
                messageOutput.payload = null;
            }
            this.ctx.res.write('data: ' + JSON.stringify(messageOutput) + '\n\n');
            this.ctx.logger.info(`Message output: ${JSON.stringify(messageOutput)}`);
        }
    }
}