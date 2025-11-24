import { ApiProperty } from '@midwayjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * 压缩会话上下文请求DTO
 */
export class CompressSessionContextRequestDTO {
    @ApiProperty({
        description: '会话ID',
        example: 'session_12345',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    sessionId: string;
}
