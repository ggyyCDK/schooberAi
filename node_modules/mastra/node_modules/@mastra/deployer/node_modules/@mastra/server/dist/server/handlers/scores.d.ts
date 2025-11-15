import type { RuntimeContext } from '@mastra/core/runtime-context';
import type { MastraScorerEntry, ScoreRowData } from '@mastra/core/scores';
import type { StoragePagination } from '@mastra/core/storage';
import type { Context } from '../types.js';
export declare function getScorersHandler({ mastra, runtimeContext }: Context & {
    runtimeContext: RuntimeContext;
}): Promise<{
    [k: string]: MastraScorerEntry & {
        agentIds: string[];
        workflowIds: string[];
    };
}>;
export declare function getScorerHandler({ mastra, scorerId, runtimeContext, }: Context & {
    scorerId: string;
    runtimeContext: RuntimeContext;
}): Promise<(MastraScorerEntry & {
    agentIds: string[];
    workflowIds: string[];
}) | null>;
export declare function getScoresByRunIdHandler({ mastra, runId, pagination, }: Context & {
    runId: string;
    pagination: StoragePagination;
}): Promise<never[] | {
    pagination: import("@mastra/core").PaginationInfo;
    scores: ScoreRowData[];
}>;
export declare function getScoresByScorerIdHandler({ mastra, scorerId, pagination, entityId, entityType, }: Context & {
    scorerId: string;
    pagination: StoragePagination;
    entityId?: string;
    entityType?: string;
}): Promise<never[] | {
    pagination: import("@mastra/core").PaginationInfo;
    scores: ScoreRowData[];
}>;
export declare function getScoresByEntityIdHandler({ mastra, entityId, entityType, pagination, }: Context & {
    entityId: string;
    entityType: string;
    pagination: StoragePagination;
}): Promise<never[] | {
    pagination: import("@mastra/core").PaginationInfo;
    scores: ScoreRowData[];
}>;
export declare function saveScoreHandler({ mastra, score }: Context & {
    score: ScoreRowData;
}): Promise<never[] | {
    score: ScoreRowData;
}>;
//# sourceMappingURL=scores.d.ts.map