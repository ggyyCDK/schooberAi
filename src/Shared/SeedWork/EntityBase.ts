//数据库底层基类
import { Ruid } from '@sevenryze/ruid';
import { Column, Index, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export enum EntityStatus {
    ACTIVE = 'Active',
    Removed = 'Removed',
}

@Entity()
export abstract class EntityBase {

    protected markActive(): void {
        this.status = EntityStatus.ACTIVE;
        this.removedDate = null as any;
    }

    protected markRemoved(): void {
        this.status = EntityStatus.Removed;
        this.removedDate = new Date();
    }

    get isActive(): boolean {
        return this.status === EntityStatus.ACTIVE;
    }

    get isRemoved(): boolean {
        return this.status === EntityStatus.Removed;
    }

    @PrimaryGeneratedColumn("increment", {
        name: 'db_id',
        type: 'bigint',
        unsigned: true,
        comment: 'The database id of the entity',
    })
    db_id!: string;

    @Index("uk_id", {
        unique: true
    })
    @Column({
        type: 'varchar',
        length: 36,
        nullable: false,
        comment: 'The id of the entity',
    })
    id: string = new Ruid().toString();

    @Column({
        name: 'status',
        type: 'varchar',
        length: 36,
        nullable: false,
        comment: 'The status of the entity',
    })
    status: EntityStatus = EntityStatus.ACTIVE;


    @VersionColumn({
        name: 'version',
        type: 'int',
        nullable: false,
        comment: 'The version of the entity',
    })
    version!: number;

    @Column({
        name: 'create_date',
        type: 'datetime',
        nullable: false,
    })
    createDate: Date = new Date();

    @UpdateDateColumn({
        name: 'update_date',
        type: 'datetime',
        nullable: false,
        comment: 'The updated date of the entity',
    })
    updatedAt!: Date;

    @Column({
        name: 'removed_date',
        type: 'datetime',
        nullable: true,
        comment: 'The removed date of the entity',
    })
    removedDate: Date | null = null;

}