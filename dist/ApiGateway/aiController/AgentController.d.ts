import { Context } from '@midwayjs/web';
import { AgentRunRequestDTO } from './RequestDTO/AgentRunRequestDTO';
import { AgentService } from '../../BussinessLayer/Agent/Application/Service/AgentService';
export declare class AgentController {
    ctx: Context;
    agentService: AgentService;
    run(body: AgentRunRequestDTO): Promise<void>;
}
