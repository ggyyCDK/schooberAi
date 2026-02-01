import { ApiProperty } from '@midwayjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class QdrantDeleteRequestDTO {
    @ApiProperty({
        description: '要删除的文档ID列表',
        example: ['doc_001', 'doc_002'],
    })
    @IsArray()
    @IsString({ each: true })
    docIds: string[];

    @ApiProperty({
        description: 'Collection 名称（可选，默认 my-collection）',
        example: 'my-collection',
        required: false,
    })
    @IsString()
    @IsOptional()
    collectionName?: string;
}
