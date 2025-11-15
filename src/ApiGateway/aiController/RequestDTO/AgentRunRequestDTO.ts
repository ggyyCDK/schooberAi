import { AiPrompt } from '@/Helper/Types/agent';
import { ApiProperty } from '@midwayjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator'
/**
 * 变量映射对象
 */
export class AgentRunRequestDTO {
    @ApiProperty({
        description: '会话ID',
        example: 'GUYUTEST1',
    })
    @IsString()
    @IsOptional()
    sessionId?: string;


    @ApiProperty({
        description: '使用者工号',
        example: 'worker001',
    })
    @IsString()
    @IsOptional()
    workerId?: string;

    @ApiProperty({
        description: '变量映射',
        example: {
            llmConfig: {
                cwdFormatted: '/',
                model: 'claude_sonnet4',
                ak: '',
                ApiUrl: ''
            }
        },
    })
    @IsString()
    @IsObject()
    variableMaps?: Record<string, string>;

    @ApiProperty({
        description: '用户问题',
        example: [
            {
                role: 'user',
                content: '你好，请介绍一下你自己'
            }
        ],
    })
    question: AiPrompt[]
}
