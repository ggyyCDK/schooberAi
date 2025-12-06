import { Agent } from '@mastra/core/agent';
import { createOpenAI } from '@ai-sdk/openai';
import { CONTEXT_COMPRESSION_SYSTEM_PROMPT } from '../prompts/contextCompressionPrompt';

const MODEL_NAME = 'claude-sonnet-4-5-20250929';

const PARAMS = {
    name: 'AI对话上下文压缩助手',
    instructions: CONTEXT_COMPRESSION_SYSTEM_PROMPT,
    tools: {}
};

export const contextCompressionAgentFactory = (apiKey?: string) => {
    const openai = createOpenAI({
        baseURL: 'https://turingai.plus/v1',
        apiKey: apiKey || '',
        name: 'idealab',
    });
    return new Agent({
        ...PARAMS,
        model: openai(MODEL_NAME),
    });
};