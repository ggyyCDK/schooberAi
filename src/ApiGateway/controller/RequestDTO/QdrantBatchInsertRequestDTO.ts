import { ApiProperty } from '@midwayjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class QdrantInsertItem {
    @ApiProperty({
        description: '需要向量化存储的文本内容',
        example: '这是一段文本',
    })
    @IsString()
    text: string;

    @ApiProperty({
        description: '附加的 payload 数据',
        example: { category: 'tech' },
        required: false,
    })
    @IsObject()
    @IsOptional()
    payload?: Record<string, any>;
}

export class QdrantBatchInsertRequestDTO {
    @ApiProperty({
        description: '批量插入的数据列表',
        type: [QdrantInsertItem],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QdrantInsertItem)
    items: QdrantInsertItem[];

    @ApiProperty({
        description: 'Collection 名称（可选，默认 my-collection）',
        example: 'my-collection',
        required: false,
    })
    @IsString()
    @IsOptional()
    collectionName?: string;
}
