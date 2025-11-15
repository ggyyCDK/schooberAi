import { AggregateRoot } from '../../../../Shared/SeedWork/AggregateRoots';
export declare class GuyuTestInfoModel extends AggregateRoot {
    constructor(options?: {
        name: string;
        description: string;
        age: number;
        phone: string;
    });
    name: string;
    description: string;
    age: number;
    phone: string;
}
