import { Agent } from '@mastra/core/agent';
import { createOpenAI } from '@ai-sdk/openai';

const MODEL_NAME = 'claude37_sonnet';

const PARAMS = {
    name: 'ai助手',
    instructions: '你是一个ai助手，你的任务是帮用户解决各种问题。',
    tools: {}
};

export const codeReviewAgentFactory = () => {
    const openai = createOpenAI({
        baseURL: 'https://idealab.alibaba-inc.com/api/openai/v1',
        apiKey: '0df43be045c860540270303846a2605b',
        name: 'idealab',
    });
    return new Agent({
        ...PARAMS,
        model: openai(MODEL_NAME),
    });
};
