export interface AiPrompt {
    role: 'system' | 'user' | 'assistant';
    content: string | any[]
}

export enum AimessageType {
    UserInput = 'UserInput',
    LLMResponse = 'LLMResponse',
}