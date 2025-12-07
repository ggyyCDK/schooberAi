import { ApiProperty } from '@midwayjs/swagger';

export class GetChatMessagesRequestDTO {
    @ApiProperty({ description: '会话ID' })
    sessionId: string;
}
