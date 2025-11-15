import { AggregateRoot } from '../../../../Shared/SeedWork/AggregateRoots';
import { AiPrompt } from '../../../../Helper/Types/agent';
export declare class AiMessageModel extends AggregateRoot {
    constructor(options?: {
        sessionId?: string;
        fromType?: string;
        messageContent?: AiPrompt[];
        workerId?: string;
        ext?: any;
        llmConfig?: any;
    });
    sessionId?: string;
    fromType?: string;
    messageContent?: AiPrompt[];
    workerId?: string;
    ext?: any;
    llmConfig?: any;
}
