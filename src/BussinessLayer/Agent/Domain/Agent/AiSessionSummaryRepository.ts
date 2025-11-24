import { Repository } from "@/Shared/SeedWork/Respository";
import { AiSessionSummaryModel } from "./AiSessionSummary";

export const AI_SESSION_SUMMARY = `AI_SESSION_SUMMARY`;

export interface IAiSessionSummaryRepository extends Repository<AiSessionSummaryModel> {
    findById(id: string): Promise<AiSessionSummaryModel | null>;
    findBySessionId(sessionId: string): Promise<AiSessionSummaryModel | null>;
    listByWorkerId(workerId: string): Promise<AiSessionSummaryModel[]>;
    listByBusinessType(businessType: string): Promise<AiSessionSummaryModel[]>;
    save(aggregator: AiSessionSummaryModel): Promise<AiSessionSummaryModel | undefined>;
    deleteBySessionId(sessionId: string): Promise<boolean>;
}