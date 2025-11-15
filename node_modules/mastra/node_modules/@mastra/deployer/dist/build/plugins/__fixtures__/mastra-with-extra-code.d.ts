export const ragAgent: Agent<"RAG Agent", {
    vectorQueryTool: any;
}, Record<string, import("@mastra/core").Metric>>;
export const mastra: Mastra<{
    ragAgent: Agent<"RAG Agent", {
        vectorQueryTool: any;
    }, Record<string, import("@mastra/core").Metric>>;
}, Record<string, import("@mastra/core/workflows/legacy").LegacyWorkflow<import("@mastra/core/workflows/legacy").LegacyStep<string, any, any, import("@mastra/core/workflows/legacy").StepExecutionContext<any, import("@mastra/core/workflows/legacy").WorkflowContext<any, import("@mastra/core/workflows/legacy").LegacyStep<string, any, any, any>[], Record<string, any>>>>[], string, any, any>>, Record<string, import("@mastra/core/workflows").Workflow<any, import("@mastra/core").Step<string, any, any, any, any, any>[], string, import("zod").ZodType<any, import("zod").ZodTypeDef, any>, import("zod").ZodType<any, import("zod").ZodTypeDef, any>, import("zod").ZodType<any, import("zod").ZodTypeDef, any>>>, {
    pgVector: any;
}, Record<string, import("@mastra/core/tts").MastraTTS>, import("@mastra/core/logger").IMastraLogger, Record<string, import("@mastra/core/network").AgentNetwork>, Record<string, import("@mastra/core/network/vNext").NewAgentNetwork>, Record<string, import("@mastra/core/mcp").MCPServerBase>>;
import { Agent } from '@mastra/core/agent';
import { Mastra } from '@mastra/core';
//# sourceMappingURL=mastra-with-extra-code.d.ts.map