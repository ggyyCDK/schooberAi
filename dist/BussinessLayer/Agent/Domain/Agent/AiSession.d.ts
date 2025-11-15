import { AggregateRoot } from '../../../../Shared/SeedWork/AggregateRoots';
export declare class AiSessionModel extends AggregateRoot {
    constructor(options?: {
        sessionId?: string;
        workerId: string;
        businessType?: string;
        name?: string;
        ext?: any;
    });
    workerId: string;
    businessType?: string;
    name?: string;
    ext?: any;
}
