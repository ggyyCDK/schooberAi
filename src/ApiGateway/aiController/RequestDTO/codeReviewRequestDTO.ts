import { ApiProperty } from '@midwayjs/swagger';

/**
 * 变量映射对象
 */
export class VariableMaps {
    @ApiProperty({
        description: '工作目录路径',
        example: '/path/to/workspace'
    })
    workDir: string;

    @ApiProperty({
        description: '用户问题',
        example: '你是谁'
    })
    question: string;

    @ApiProperty({
        description: '是否使用流式响应',
        example: true
    })
    stream: boolean;
}

/**
 * 代码审查请求DTO
 */
export class CodeReviewDto {
    @ApiProperty({
        description: '变量映射对象',
        type: VariableMaps
    })
    variableMaps: VariableMaps;
}
