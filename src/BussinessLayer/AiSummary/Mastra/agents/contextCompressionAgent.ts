import { Agent } from '@mastra/core/agent';
import { createOpenAI } from '@ai-sdk/openai';
import { CONTEXT_COMPRESSION_SYSTEM_PROMPT } from '../prompts/contextCompressionPrompt';

const MODEL_NAME = 'claude_sonnet4_5';

const PARAMS = {
    name: 'AI对话上下文压缩助手',
    instructions: CONTEXT_COMPRESSION_SYSTEM_PROMPT,
    tools: {}
};

export const contextCompressionAgentFactory = () => {
    const openai = createOpenAI({
        baseURL: 'https://idealab.alibaba-inc.com/api/openai/v1',
        apiKey: 'qqq',
        name: 'idealab',
    });
    return new Agent({
        ...PARAMS,
        model: openai(MODEL_NAME),
    });
};