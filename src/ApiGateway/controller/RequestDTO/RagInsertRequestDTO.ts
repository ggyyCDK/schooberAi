import { ApiProperty } from '@midwayjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class RagInsertRequestDTO {
  @ApiProperty({
    description: '用户输入的文本内容',
    example: '这是一段需要向量化存储的文本内容'
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: '文档ID（可选，不传则自动生成）',
    example: 'doc_001',
    required: false
  })
  @IsString()
  @IsOptional()
  docId?: string;
}
