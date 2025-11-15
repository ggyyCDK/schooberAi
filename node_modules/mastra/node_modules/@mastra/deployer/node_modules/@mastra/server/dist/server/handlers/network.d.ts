import type { GenerateReturn } from '@mastra/core/llm';
import type { AgentNetwork } from '@mastra/core/network';
import type { RuntimeContext } from '@mastra/core/runtime-context';
import type { Context } from '../types.js';
interface NetworkContext extends Context {
    networkId?: string;
    runtimeContext: RuntimeContext;
}
export declare function getNetworksHandler({ mastra, runtimeContext, }: Pick<NetworkContext, 'mastra' | 'runtimeContext'>): Promise<{
    id: string;
    name: string;
    instructions: string;
    agents: {
        name: string;
        provider: string;
        modelId: string;
    }[];
    routingModel: {
        provider: string;
        modelId: string;
    };
}[]>;
export declare function getNetworkByIdHandler({ mastra, networkId, runtimeContext, }: Pick<NetworkContext, 'mastra' | 'networkId' | 'runtimeContext'>): Promise<{
    id: string;
    name: string;
    instructions: string;
    agents: {
        name: string;
        provider: string;
        modelId: string;
    }[];
    routingModel: {
        provider: string;
        modelId: string;
    };
}>;
export declare function generateHandler({ mastra, runtimeContext, networkId, body, }: NetworkContext & {
    runtimeContext: RuntimeContext;
    body: {
        messages?: Parameters<AgentNetwork['generate']>[0];
    } & Parameters<AgentNetwork['generate']>[1];
}): Promise<GenerateReturn<any, any, any>>;
export declare function streamGenerateHandler({ mastra, networkId, body, runtimeContext, }: NetworkContext & {
    runtimeContext: RuntimeContext;
    body: {
        messages?: Parameters<AgentNetwork['stream']>[0];
    } & Parameters<AgentNetwork['stream']>[1];
}): Promise<Response>;
export {};
//# sourceMappingURL=network.d.ts.map