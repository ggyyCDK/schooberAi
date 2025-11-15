import { Repository } from "@/Shared/SeedWork/Respository";
import { AiSessionModel } from "./AiSession";

export const AI_SESSION = `AI_SESSION`;

export interface IAiSessionRepository extends Repository<AiSessionModel> {
    findById(id: string): Promise<AiSessionModel | null>;
    save(aggregator: AiSessionModel): Promise<AiSessionModel | undefined>;
}

