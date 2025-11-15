import { EntityBase } from './EntityBase';

export abstract class AggregateRoot extends EntityBase {

    // private domainEvents: unknown[] = [];

    protected addDomainEvent(event: unknown): void {
        throw new Error('Need implemented');
    }

    protected removeDomainEvent(event: unknown): void {
        throw new Error('Need implemented');
    }

    protected clearDomainEvents(): void {
        // this.domainEvents = [];
    }
}