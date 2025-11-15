import { Column, Entity } from 'typeorm';
import { AggregateRoot } from '@/Shared/SeedWork/AggregateRoots';

@Entity(`guyu_info`)
export class GuyuTestInfoModel extends AggregateRoot {

    constructor(options?: {
        name: string;
        description: string;
        age: number;
        phone: string;
    }) {
        super();
        if (options) {
            this.name = options.name;
            this.description = options.description;
            this.age = options.age;
            this.phone = options.phone;
        }
    }

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    description!: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    age!: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    phone!: string;

}
