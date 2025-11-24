import { Agent } from '@mastra/core/agent';
import { createOpenAI } from '@ai-sdk/openai';
const MODEL_NAME = 'claude37_sonnet';

const PARAMS = {
    name: 'ai历史记录压缩助手',
    instructions: '你是一个专注于上下文压缩的专家，你需要保留用户的原始输入和assisant的输入的工具名称和工具返回，其他内容可以压缩简化',
    tools: {}
};

export const codeReviewAgentFactory = () => {
    const openai = createOpenAI({
        baseURL: '',
        apiKey: '',
        name: 'idealab',
    });
    return new Agent({
        ...PARAMS,
        model: openai(MODEL_NAME),
    });
};
