import type { Agent } from '@mastra/core/agent';
import type { Context } from '../types.js';
interface VoiceContext extends Context {
    agentId?: string;
}
/**
 * Get available speakers for an agent
 */
export declare function getSpeakersHandler({ mastra, agentId }: VoiceContext): Promise<{
    voiceId: string;
}[]>;
/**
 * Generate speech from text
 */
export declare function generateSpeechHandler({ mastra, agentId, body, }: VoiceContext & {
    body?: {
        text?: string;
        speakerId?: string;
    };
}): Promise<NodeJS.ReadableStream>;
/**
 * Transcribe speech to text
 */
export declare function transcribeSpeechHandler({ mastra, agentId, body, }: VoiceContext & {
    body?: {
        audioData?: Buffer;
        options?: Parameters<NonNullable<Agent['voice']>['listen']>[1];
    };
}): Promise<{
    text: string | void | NodeJS.ReadableStream;
}>;
/**
 * Get available listeners for an agent
 */
export declare function getListenerHandler({ mastra, agentId }: VoiceContext): Promise<{
    enabled: boolean;
}>;
export {};
//# sourceMappingURL=voice.d.ts.map