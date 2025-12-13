import { ApiProperty } from '@midwayjs/swagger';
import { IsString } from 'class-validator';

export class RagUpdateRequestDTO {
  @ApiProperty({
    description: '文档ID',
    example: 'doc_001'
  })
  @IsString()
  docId: string;

  @ApiProperty({
    description: '更新的文本内容',
    example: '这是更新后的文本内容'
  })
  @IsString()
  text: string;
}
