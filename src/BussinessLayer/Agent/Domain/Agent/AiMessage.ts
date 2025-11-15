import { Column, Entity } from 'typeorm';
import { AggregateRoot } from '@/Shared/SeedWork/AggregateRoots';
import { AiPrompt } from '@/Helper/Types/agent';

@Entity('ai_message')
export class AiMessageModel extends AggregateRoot {

    constructor(options?: {
        sessionId?: string;
        fromType?: string;
        messageContent?: AiPrompt[];
        workerId?: string;
        ext?: any;
        llmConfig?: any;
    }) {
        super();
        if (options) {
            if (options.sessionId) this.sessionId = options.sessionId;
            if (options.fromType) this.fromType = options.fromType;
            if (options.messageContent) this.messageContent = options.messageContent;
            if (options.workerId) this.workerId = options.workerId;
            if (options.ext) this.ext = options.ext;
            if (options.llmConfig) this.llmConfig = options.llmConfig;
        }
    }

    @Column({
        name: 'session_id',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '关联的会话 ID'
    })
    sessionId?: string;

    @Column({
        name: 'from_type',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '消息来源类型（用户/AI 等）'
    })
    fromType?: string;

    @Column({
        name: 'message_content',
        type: 'json',
        nullable: true,
        comment: '消息内容'
    })
    messageContent?: AiPrompt[];

    @Column({
        name: 'worker_id',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '工作者 ID'
    })
    workerId?: string;

    @Column({
        name: 'ext',
        type: 'json',
        nullable: true,
        comment: '扩展字段'
    })
    ext?: any;

    @Column({
        name: 'llm_config',
        type: 'json',
        nullable: true,
        comment: '大模型配置'
    })
    llmConfig?: any;

}
