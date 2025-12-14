import { ApiProperty } from '@midwayjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class RagQueryRequestDTO {
  @ApiProperty({
    description: '用户输入的查询文本',
    example: '如何使用向量数据库'
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: '返回的最相似结果数量',
    example: 10,
    required: false,
    default: 10
  })
  @IsNumber()
  @IsOptional()
  topk?: number;

  @ApiProperty({
    description: '是否返回向量数据',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  includeVector?: boolean;

  @ApiProperty({
    description: '是否启用 Rerank 重新排序',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  useRerank?: boolean;

  @ApiProperty({
    description: 'Rerank 返回的Top N结果数量',
    example: 5,
    required: false
  })
  @IsNumber()
  @IsOptional()
  rerankTopN?: number;
}
