export interface AiPrompt {
    role: 'system' | 'user' | 'assistant';
    content: string | any[];
}
export declare enum AimessageType {
    UserInput = "UserInput",
    LLMResponse = "LLMResponse"
}
