import { AggregateRoot } from "./AggregateRoots";
export interface Repository<T extends AggregateRoot> {
    findById(id: string): Promise<T | null>;
    save(aggregator: T | T[]): Promise<T | void | undefined>;
}
