import { Context } from '@midwayjs/web';
import { CodeReviewDto } from './RequestDTO/codeReviewRequestDTO';
import { CodeReviewAgentService } from '../../BussinessLayer/CodeReview/Application/service/codeReviewAgentService';
export declare class APIController {
    ctx: Context;
    codeReviewAgentService: CodeReviewAgentService;
    runUser(body: CodeReviewDto): Promise<void>;
}
