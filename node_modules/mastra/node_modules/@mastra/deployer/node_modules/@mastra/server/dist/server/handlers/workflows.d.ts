import { ReadableStream } from 'node:stream/web';
import type { RuntimeContext } from '@mastra/core/di';
import type { WorkflowRuns } from '@mastra/core/storage';
import type { Workflow, SerializedStepFlowEntry, WatchEvent } from '@mastra/core/workflows';
import type { Context } from '../types.js';
interface WorkflowContext extends Context {
    workflowId?: string;
    runId?: string;
}
export declare function getWorkflowsHandler({ mastra }: WorkflowContext): Promise<any>;
type SerializedStep = {
    id: string;
    description: string;
    inputSchema: string | undefined;
    outputSchema: string | undefined;
    resumeSchema: string | undefined;
    suspendSchema: string | undefined;
};
export declare function getWorkflowByIdHandler({ mastra, workflowId }: WorkflowContext): Promise<{
    steps: Record<string, SerializedStep>;
    allSteps: Record<string, SerializedStep>;
    name: string | undefined;
    description: string | undefined;
    stepGraph: SerializedStepFlowEntry[];
    inputSchema: string | undefined;
    outputSchema: string | undefined;
}>;
export declare function getWorkflowRunByIdHandler({ mastra, workflowId, runId, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'>): Promise<ReturnType<Workflow['getWorkflowRunById']>>;
export declare function getWorkflowRunExecutionResultHandler({ mastra, workflowId, runId, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'>): Promise<WatchEvent['payload']['workflowState']>;
export declare function createWorkflowRunHandler({ mastra, workflowId, runId: prevRunId, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'>): Promise<{
    runId: string;
}>;
export declare function startAsyncWorkflowHandler({ mastra, runtimeContext, workflowId, runId, inputData, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'> & {
    inputData?: unknown;
    runtimeContext?: RuntimeContext;
}): Promise<import("@mastra/core").WorkflowResult<import("zod").ZodType<any, import("zod").ZodTypeDef, any>, import("@mastra/core").Step<string, any, any, any, any, any>[]>>;
export declare function startWorkflowRunHandler({ mastra, runtimeContext, workflowId, runId, inputData, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'> & {
    inputData?: unknown;
    runtimeContext?: RuntimeContext;
}): Promise<{
    message: string;
}>;
export declare function watchWorkflowHandler({ mastra, workflowId, runId, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'>): Promise<ReadableStream<string>>;
export declare function streamWorkflowHandler({ mastra, runtimeContext, workflowId, runId, inputData, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'> & {
    inputData?: unknown;
    runtimeContext?: RuntimeContext;
}): Promise<{
    stream: ReadableStream<import("@mastra/core").StreamEvent>;
    getWorkflowState: () => Promise<import("@mastra/core").WorkflowResult<import("zod").ZodType<any, import("zod").ZodTypeDef, any>, import("@mastra/core").Step<string, any, any, any, any, any>[]>>;
}>;
export declare function streamVNextWorkflowHandler({ mastra, runtimeContext, workflowId, runId, inputData, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'> & {
    inputData?: unknown;
    runtimeContext?: RuntimeContext;
}): Promise<import("@mastra/core").MastraWorkflowStream>;
export declare function resumeAsyncWorkflowHandler({ mastra, workflowId, runId, body, runtimeContext, }: WorkflowContext & {
    body: {
        step: string | string[];
        resumeData?: unknown;
    };
    runtimeContext?: RuntimeContext;
}): Promise<import("@mastra/core").WorkflowResult<import("zod").ZodType<any, import("zod").ZodTypeDef, any>, import("@mastra/core").Step<string, any, any, any, any, any>[]>>;
export declare function resumeWorkflowHandler({ mastra, workflowId, runId, body, runtimeContext, }: WorkflowContext & {
    body: {
        step: string | string[];
        resumeData?: unknown;
    };
    runtimeContext?: RuntimeContext;
}): Promise<{
    message: string;
}>;
export declare function getWorkflowRunsHandler({ mastra, workflowId, fromDate, toDate, limit, offset, resourceId, }: WorkflowContext & {
    fromDate?: Date;
    toDate?: Date;
    limit?: number;
    offset?: number;
    resourceId?: string;
}): Promise<WorkflowRuns>;
export declare function cancelWorkflowRunHandler({ mastra, workflowId, runId, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'>): Promise<{
    message: string;
}>;
export declare function sendWorkflowRunEventHandler({ mastra, workflowId, runId, event, data, }: Pick<WorkflowContext, 'mastra' | 'workflowId' | 'runId'> & {
    event: string;
    data: unknown;
}): Promise<{
    message: string;
}>;
export {};
//# sourceMappingURL=workflows.d.ts.map