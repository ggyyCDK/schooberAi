import { ApiProperty } from '@midwayjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';

export class QdrantInsertRequestDTO {
    @ApiProperty({
        description: '需要向量化存储的文本内容',
        example: '这是一段需要向量化存储的文本内容',
    })
    @IsString()
    text: string;

    @ApiProperty({
        description: 'Collection 名称（可选，默认 my-collection）',
        example: 'my-collection',
        required: false,
    })
    @IsString()
    @IsOptional()
    collectionName?: string;

    @ApiProperty({
        description: '附加的 payload 数据',
        example: { category: 'tech', source: 'web' },
        required: false,
    })
    @IsObject()
    @IsOptional()
    payload?: Record<string, any>;
}
