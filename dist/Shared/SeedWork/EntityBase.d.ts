export declare enum EntityStatus {
    ACTIVE = "Active",
    Removed = "Removed"
}
export declare abstract class EntityBase {
    protected markActive(): void;
    protected markRemoved(): void;
    get isActive(): boolean;
    get isRemoved(): boolean;
    db_id: string;
    id: string;
    status: EntityStatus;
    version: number;
    createDate: Date;
    updatedAt: Date;
    removedDate: Date | null;
}
