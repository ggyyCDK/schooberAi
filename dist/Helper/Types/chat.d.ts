import { AiPrompt } from "./agent";
import { ParseResult } from './parseResult';
export interface AiChatInputCommand {
    model: string;
    messages: AiPrompt[];
    from?: string;
    temperature?: number;
    max_tokens?: number;
    timeout?: number;
    stream?: boolean;
    ak?: string;
    ApiUrl?: string;
}
export interface AiStreamChatInputCommand extends AiChatInputCommand {
    onMessage?: (message: ParseResult) => void;
    onError?: (error: Error) => void;
    onCompleted?: (message: ParseResult) => void;
}
export interface AiChatResponse {
    responseContent: string;
}
