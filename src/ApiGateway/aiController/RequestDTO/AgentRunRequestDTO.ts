import { AiPrompt } from '@/Helper/Types/agent';
import { ApiProperty } from '@midwayjs/swagger';
import { IsBoolean, IsObject, IsOptional, IsString, IsArray } from 'class-validator'
/**
 * 变量映射对象
 */
export class AgentRunRequestDTO {
    @ApiProperty({
        description: '是否启用MCP Hub',
        example: false,
    })
    @IsBoolean()
    @IsOptional()
    mcpHub?: boolean;

    @ApiProperty({
        description: 'MCP Hub数据信息',
        example: [],
    })
    @IsArray()
    @IsOptional()
    mcpHubDataInfo?: any[];

    @ApiProperty({
        description: '会话ID',
        example: 'GUYUTEST1',
    })
    @IsString()
    @IsOptional()
    sessionId?: string;

    @ApiProperty({
        description: '会话标题',
        example: '会话标题',
    })
    @IsString()
    @IsOptional()
    sessionTitle?: string;


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
                model: 'claude-sonnet-4-5-20250929',
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
