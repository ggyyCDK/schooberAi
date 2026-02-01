import { ApiProperty } from '@midwayjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class QdrantQueryRequestDTO {
    @ApiProperty({
        description: '查询文本',
        example: '如何使用向量数据库',
    })
    @IsString()
    text: string;

    @ApiProperty({
        description: '返回的最相似结果数量',
        example: 10,
        required: false,
        default: 10,
    })
    @IsNumber()
    @IsOptional()
    topk?: number;

    @ApiProperty({
        description: 'Collection 名称（可选，默认 my-collection）',
        example: 'my-collection',
        required: false,
    })
    @IsString()
    @IsOptional()
    collectionName?: string;

    @ApiProperty({
        description: '过滤条件（Qdrant filter 格式）',
        example: { must: [{ key: 'category', match: { value: 'tech' } }] },
        required: false,
    })
    @IsObject()
    @IsOptional()
    filter?: Record<string, any>;

    @ApiProperty({
        description: '相似度分数阈值，低于此分数的结果将被过滤',
        example: 0.7,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    scoreThreshold?: number;

    @ApiProperty({
        description: '是否启用 Rerank 重新排序',
        example: false,
        required: false,
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    useRerank?: boolean;

    @ApiProperty({
        description: 'Rerank 返回的 Top N 结果数量',
        example: 5,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    rerankTopN?: number;
}
