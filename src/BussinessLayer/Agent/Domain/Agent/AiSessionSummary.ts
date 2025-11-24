import { Column, Entity } from 'typeorm';
import { AggregateRoot } from '@/Shared/SeedWork/AggregateRoots';

@Entity('ai_session_summary')
export class AiSessionSummaryModel extends AggregateRoot {

    constructor(options?: {
        name?: string;
        businessType?: string;
        workerId?: string;
        lastMsgId?: string;
        sessionId?: string;
        summaryContent?: string;
        ext?: any;
    }) {
        super();
        if (options) {
            if (options.name) this.name = options.name;
            if (options.businessType) this.businessType = options.businessType;
            if (options.workerId) this.workerId = options.workerId;
            if (options.lastMsgId) this.lastMsgId = options.lastMsgId;
            if (options.sessionId) this.sessionId = options.sessionId;
            if (options.summaryContent) this.summaryContent = options.summaryContent;
            if (options.ext) this.ext = options.ext;
        }
    }

    @Column({
        name: 'name',
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: '会话摘要名称'
    })
    name?: string;

    @Column({
        name: 'business_type',
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: '业务类型'
    })
    businessType?: string;

    @Column({
        name: 'worker_id',
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: '工作者 ID'
    })
    workerId?: string;

    @Column({
        name: 'last_msg_id',
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: '最后一条消息 ID'
    })
    lastMsgId?: string;

    @Column({
        name: 'session_id',
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: '关联的会话 ID'
    })
    sessionId?: string;

    @Column({
        name: 'summary_content',
        type: 'text',
        nullable: true,
        comment: '摘要内容'
    })
    summaryContent?: string;

    @Column({
        name: 'ext',
        type: 'json',
        nullable: true,
        comment: '扩展字段'
    })
    ext?: any;

}