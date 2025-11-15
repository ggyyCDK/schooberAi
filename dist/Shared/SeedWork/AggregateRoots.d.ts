import { EntityBase } from './EntityBase';
export declare abstract class AggregateRoot extends EntityBase {
    protected addDomainEvent(event: unknown): void;
    protected removeDomainEvent(event: unknown): void;
    protected clearDomainEvents(): void;
}
