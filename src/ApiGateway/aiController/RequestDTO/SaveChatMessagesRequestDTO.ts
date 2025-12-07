import { ApiProperty } from '@midwayjs/swagger';

export class SaveChatMessagesRequestDTO {
    @ApiProperty({ description: '会话ID' })
    sessionId: string;

    @ApiProperty({ description: '消息列表' })
    chatMessages: any[];
}
