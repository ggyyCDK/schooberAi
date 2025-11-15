import { Context } from '@midwayjs/web';
export declare class CodeReviewAgentService {
    ctx: Context;
    startCodeReviewAgent(workDir: string, question: string, stream: boolean): Promise<void>;
}
