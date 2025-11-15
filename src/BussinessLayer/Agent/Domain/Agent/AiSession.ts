import { Column, Entity } from 'typeorm';
import { AggregateRoot } from '@/Shared/SeedWork/AggregateRoots';

@Entity(`ai_session`)
export class AiSessionModel extends AggregateRoot {

    constructor(options?: {
        sessionId?: string;
        workerId: string;
        businessType?: string;
        name?: string;
        ext?: any
    }) {
        super();
        if (options) {
            if (options.sessionId) this.id = options.sessionId;
            this.workerId = options.workerId;
            if (options.businessType) this.businessType = options.businessType;
            if (options.name) this.name = options.name;
            if (options.ext) this.ext = options.ext;
        }
    }


    @Column({
        name: 'worker_id',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '工作者ID'
    })
    workerId: string;

    @Column({
        name: 'business_type',
        type: 'varchar',
        length: 100,
        nullable: true,
        comment: '业务类型'
    })
    businessType?: string;

    @Column({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '会话名称'
    })
    name?: string;

    @Column({
        name: 'ext',
        type: 'json',
        nullable: true,
        comment: '扩展字段'
    })
    ext?: any;

}
