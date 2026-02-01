import { ApiProperty } from '@midwayjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class QdrantCreateIndexRequestDTO {
    @ApiProperty({
        description: '需要创建索引的字段名',
        example: 'category',
    })
    @IsString()
    fieldName: string;

    @ApiProperty({
        description: '字段类型',
        example: 'keyword',
        enum: ['keyword', 'integer', 'float', 'bool', 'geo', 'datetime', 'text'],
    })
    @IsString()
    @IsIn(['keyword', 'integer', 'float', 'bool', 'geo', 'datetime', 'text'])
    fieldType: 'keyword' | 'integer' | 'float' | 'bool' | 'geo' | 'datetime' | 'text';

    @ApiProperty({
        description: 'Collection 名称（可选，默认 my-collection）',
        example: 'my-collection',
        required: false,
    })
    @IsString()
    @IsOptional()
    collectionName?: string;
}
