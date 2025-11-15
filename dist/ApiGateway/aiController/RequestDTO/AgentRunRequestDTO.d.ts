import { AiPrompt } from '../../../Helper/Types/agent';
/**
 * 变量映射对象
 */
export declare class AgentRunRequestDTO {
    sessionId?: string;
    workerId?: string;
    variableMaps?: Record<string, string>;
    question: AiPrompt[];
}
