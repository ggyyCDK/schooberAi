import { Column, Entity } from 'typeorm';
import { AggregateRoot } from '@/Shared/SeedWork/AggregateRoots';

@Entity('ai_multi_round_message')
export class AiMultiRoundMessageModel extends AggregateRoot {

    constructor(options?: {
        conversationId?: string;
        type?: string;
        content?: any;
        sender?: any;
        msgStatus?: string;
        workerId?: string;
        ext?: any;
    }) {
        super();
        if (options) {
            if (options.conversationId) this.conversationId = options.conversationId;
            if (options.type) this.type = options.type;
            if (options.content) this.content = options.content;
            if (options.sender) this.sender = options.sender;
            if (options.msgStatus) this.msgStatus = options.msgStatus;
            if (options.workerId) this.workerId = options.workerId;
            if (options.ext) this.ext = options.ext;
        }
    }

    @Column({
        name: 'conversation_id',
        type: 'char',
        length: 40,
        nullable: false,
        comment: '所属会话id'
    })
    conversationId?: string;

    @Column({
        name: 'type',
        type: 'varchar',
        length: 50,
        nullable: false,
        comment: '消息类型'
    })
    type?: string;

    @Column({
        name: 'content',
        type: 'json',
        nullable: false,
        comment: '请求的具体内容'
    })
    content?: any;

    @Column({
        name: 'sender',
        type: 'json',
        nullable: false,
        comment: '发送者'
    })
    sender?: any;

    @Column({
        name: 'msg_status',
        type: 'varchar',
        length: 50,
        nullable: false,
        comment: '消息状态'
    })
    msgStatus?: string;

    @Column({
        name: 'worker_id',
        type: 'varchar',
        length: 50,
        nullable: false,
        comment: '创建者id'
    })
    workerId?: string;

    @Column({
        name: 'ext',
        type: 'json',
        nullable: true,
        comment: '额外信息'
    })
    ext?: any;

}
