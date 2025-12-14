import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface QueryCommand {
    text: string;
    topk?: number;
    includeVector?: boolean;
    collectionName?: string;
    useRerank?: boolean;
    rerankTopN?: number;
}

/**
 * 使用阿里云百炼 rerank 模型对查询结果重新排序
 */
async function rerankResults(command: {
    query: string;
    documents: string[];
    apiKey: string;
    topN?: number;
}): Promise<{ rankings: any[]; duration: number }> {
    const startTime = Date.now();
    try {
        const { query, documents, apiKey, topN } = command;
        
        if (!documents || documents.length === 0) {
            return { rankings: [], duration: 0 };
        }

        // 阿里云百炼 Rerank API
        const rerankURL = 'https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank';
        
        const response = await axios.post(
            rerankURL,
            {
                model: 'gte-rerank',
                input: {
                    query: query,
                    documents: documents
                },
                parameters: {
                    top_n: topN || documents.length,
                    return_documents: true
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        const duration = Date.now() - startTime;

        // 百炼返回格式: response.data.output.results
        if (response.data.output && response.data.output.results) {
            return {
                rankings: response.data.output.results,
                duration
            };
        } else {
            throw new Error('百炼 Rerank API 返回数据格式异常');
        }
    } catch (error) {
        console.error(`Rerank 失败:`, error.message);
        if (axios.isAxiosError(error)) {
            console.error(`百炼 Rerank API 响应:`, JSON.stringify(error.response?.data));
        }
        throw error;
    }
}

/**
 * 使用阿里云百炼 text-embedding-v2 模型将文本转换为向量
 */
async function textToVector(text: string, apiKey: string): Promise<number[]> {
    try {
        const dashscopeURL = 'https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/text-embedding';
        
        const response = await axios.post(
            dashscopeURL,
            {
                model: 'text-embedding-v2',
                input: {
                    texts: [text]
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data.output && response.data.output.embeddings && response.data.output.embeddings.length > 0) {
            return response.data.output.embeddings[0].embedding;
        } else {
            throw new Error('百炼 API 返回数据格式异常');
        }
    } catch (error) {
        console.error(`文本向量化失败:`, error.message);
        if (axios.isAxiosError(error)) {
            console.error(`百炼 API 响应:`, JSON.stringify(error.response?.data));
        }
        throw error;
    }
}

/**
 * 查询相似向量
 */
async function queryVector(command: QueryCommand): Promise<any> {
    const startTime = Date.now();
    
    try {
        const { 
            text, 
            topk = 10, 
            includeVector = false, 
            collectionName = 'Schoober_Doc_Collection',
            useRerank = false,
            rerankTopN
        } = command;
        
        // 从环境变量读取 API Keys
        const dashvectorApiKey = process.env.DASHVECTOR_API_KEY;
        const dashscopeApiKey = process.env.DASHSCOPE_API_KEY;

        if (!dashvectorApiKey || !dashscopeApiKey) {
            throw new Error('缺少必要的环境变量: DASHVECTOR_API_KEY 或 DASHSCOPE_API_KEY');
        }

        console.log(`[1/${useRerank ? '4' : '3'}] 开始向量化查询文本: ${text.substring(0, 50)}...`);
        const vectorStartTime = Date.now();
        const vector = await textToVector(text, dashscopeApiKey);
        console.log(`✓ 向量化完成 (耗时: ${Date.now() - vectorStartTime}ms, 维度: ${vector.length})`);

        // 构造查询请求
        const queryData = {
            vector: vector,
            topk: topk,
            include_vector: includeVector
        };

        // 调用 DashVector 查询 API
        const endpoint = `https://vrs-cn-1wy4kbz6a00011.dashvector.cn-hangzhou.aliyuncs.com/v1/collections/${collectionName}/query`;

        console.log(`[2/${useRerank ? '4' : '3'}] 开始查询 DashVector (topk=${topk})...`);
        const queryStartTime = Date.now();
        
        const response = await axios.post(
            endpoint,
            queryData,
            {
                headers: {
                    'dashvector-auth-token': dashvectorApiKey,
                    'Content-Type': 'application/json',
                },
            }
        );
        
        const queryDuration = Date.now() - queryStartTime;
        console.log(`✓ 查询完成 (耗时: ${queryDuration}ms)`);

        let results = response.data.output || [];
        let rerankDuration = 0;

        // 如果启用 Rerank，对结果重新排序
        if (useRerank && results.length > 0) {
            console.log(`[3/4] 开始 Rerank 重新排序...`);
            
            // 提取文档内容
            const documents = results.map((item: any) => item.fields?.document || '');
            
            const rerankResult = await rerankResults({
                query: text,
                documents: documents,
                apiKey: dashscopeApiKey,
                topN: rerankTopN || results.length
            });
            
            rerankDuration = rerankResult.duration;
            console.log(`✓ Rerank 完成 (耗时: ${rerankDuration}ms)`);
            
            // 根据 Rerank 结果重新排序原始结果
            const rerankedResults = rerankResult.rankings.map((ranking: any) => {
                const originalResult = results[ranking.index];
                return {
                    ...originalResult,
                    rerank_score: ranking.relevance_score,
                    original_index: ranking.index,
                    original_score: originalResult.score
                };
            });
            
            results = rerankedResults;
        }

        const totalTime = Date.now() - startTime;
        
        console.log(`\n[${useRerank ? '4/4' : '3/3'}] 查询结果:`);
        console.log(`─────────────────────────────────────────────────────────────`);
        console.log(`总耗时: ${totalTime}ms | 返回结果数: ${results.length}`);
        if (useRerank) {
            console.log(`  - 向量化: ${Date.now() - startTime - queryDuration - rerankDuration}ms`);
            console.log(`  - 查询: ${queryDuration}ms`);
            console.log(`  - Rerank: ${rerankDuration}ms`);
        }
        console.log(`─────────────────────────────────────────────────────────────\n`);

        // 格式化输出结果
        results.forEach((item: any, index: number) => {
            console.log(`【结果 ${index + 1}】`);
            console.log(`  ID: ${item.id}`);
            if (useRerank && item.rerank_score !== undefined) {
                console.log(`  Rerank分数: ${item.rerank_score.toFixed(4)}`);
                console.log(`  原始分数: ${item.original_score.toFixed(4)}`);
                console.log(`  原始排序: #${item.original_index + 1}`);
            } else {
                console.log(`  相似度分数: ${item.score}`);
            }
            console.log(`  文档内容: ${item.fields?.document?.substring(0, 200)}${item.fields?.document?.length > 200 ? '...' : ''}`);
            console.log('');
        });

        return {
            query: text,
            topk: topk,
            results: results,
            total: results.length,
            totalTime: totalTime,
            rerank_enabled: useRerank,
            dashvectorResponse: response.data,
        };
    } catch (error) {
        console.error(`\n❌ 向量查询失败: ${error.message}`);
        if (axios.isAxiosError(error)) {
            console.error(`DashVector API 响应:`, JSON.stringify(error.response?.data));
        }
        throw error;
    }
}

// 主函数
async function main() {
    // 从命令行参数读取查询文本
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('使用方法:');
        console.log('  ts-node scripts/queryRag.ts "查询文本" [topk] [useRerank] [rerankTopN] [collectionName]');
        console.log('');
        console.log('示例:');
        console.log('  ts-node scripts/queryRag.ts "如何使用AI功能" 5');
        console.log('  ts-node scripts/queryRag.ts "API文档" 10 true 3');
        console.log('  ts-node scripts/queryRag.ts "向量查询" 10 true 5 Schoober_Doc_Collection');
        process.exit(1);
    }

    const text = args[0];
    const topk = args[1] ? parseInt(args[1]) : 10;
    const useRerank = args[2] === 'true';
    const rerankTopN = args[3] ? parseInt(args[3]) : undefined;
    const collectionName = args[4] || 'Schoober_Doc_Collection';

    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  RAG 向量查询脚本');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`查询文本: ${text}`);
    console.log(`TopK: ${topk}`);
    console.log(`Rerank: ${useRerank ? '已启用' : '未启用'}`);
    if (useRerank && rerankTopN) {
        console.log(`Rerank TopN: ${rerankTopN}`);
    }
    console.log(`集合名称: ${collectionName}`);
    console.log('═══════════════════════════════════════════════════════════════\n');

    await queryVector({
        text,
        topk,
        includeVector: false,
        collectionName,
        useRerank,
        rerankTopN
    });
}

// 运行主函数
main().catch(error => {
    console.error('脚本执行失败:', error);
    process.exit(1);
});
