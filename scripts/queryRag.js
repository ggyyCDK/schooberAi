"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const dotenv = require("dotenv");
const path = require("path");
// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, '../.env') });
/**
 * 使用阿里云百炼 rerank 模型对查询结果重新排序
 */
async function rerankResults(command) {
    var _a;
    const startTime = Date.now();
    try {
        const { query, documents, apiKey, topN } = command;
        if (!documents || documents.length === 0) {
            return { rankings: [], duration: 0 };
        }
        // 阿里云百炼 Rerank API
        const rerankURL = 'https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank';
        const response = await axios_1.default.post(rerankURL, {
            model: 'gte-rerank',
            input: {
                query: query,
                documents: documents
            },
            parameters: {
                top_n: topN || documents.length,
                return_documents: true
            }
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            }
        });
        const duration = Date.now() - startTime;
        // 百炼返回格式: response.data.output.results
        if (response.data.output && response.data.output.results) {
            return {
                rankings: response.data.output.results,
                duration
            };
        }
        else {
            throw new Error('百炼 Rerank API 返回数据格式异常');
        }
    }
    catch (error) {
        console.error(`Rerank 失败:`, error.message);
        if (axios_1.default.isAxiosError(error)) {
            console.error(`百炼 Rerank API 响应:`, JSON.stringify((_a = error.response) === null || _a === void 0 ? void 0 : _a.data));
        }
        throw error;
    }
}
/**
 * 使用阿里云百炼 text-embedding-v2 模型将文本转换为向量
 */
async function textToVector(text, apiKey) {
    var _a;
    try {
        const dashscopeURL = 'https://dashscope.aliyuncs.com/api/v1/services/embeddings/text-embedding/text-embedding';
        const response = await axios_1.default.post(dashscopeURL, {
            model: 'text-embedding-v2',
            input: {
                texts: [text]
            }
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (response.data.output && response.data.output.embeddings && response.data.output.embeddings.length > 0) {
            return response.data.output.embeddings[0].embedding;
        }
        else {
            throw new Error('百炼 API 返回数据格式异常');
        }
    }
    catch (error) {
        console.error(`文本向量化失败:`, error.message);
        if (axios_1.default.isAxiosError(error)) {
            console.error(`百炼 API 响应:`, JSON.stringify((_a = error.response) === null || _a === void 0 ? void 0 : _a.data));
        }
        throw error;
    }
}
/**
 * 查询相似向量
 */
async function queryVector(command) {
    var _a;
    const startTime = Date.now();
    try {
        const { text, topk = 10, includeVector = false, collectionName = 'Schoober_Doc_Collection', useRerank = false, rerankTopN } = command;
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
        const response = await axios_1.default.post(endpoint, queryData, {
            headers: {
                'dashvector-auth-token': dashvectorApiKey,
                'Content-Type': 'application/json',
            },
        });
        const queryDuration = Date.now() - queryStartTime;
        console.log(`✓ 查询完成 (耗时: ${queryDuration}ms)`);
        let results = response.data.output || [];
        let rerankDuration = 0;
        // 如果启用 Rerank，对结果重新排序
        if (useRerank && results.length > 0) {
            console.log(`[3/4] 开始 Rerank 重新排序...`);
            // 提取文档内容
            const documents = results.map((item) => { var _a; return ((_a = item.fields) === null || _a === void 0 ? void 0 : _a.document) || ''; });
            const rerankResult = await rerankResults({
                query: text,
                documents: documents,
                apiKey: dashscopeApiKey,
                topN: rerankTopN || results.length
            });
            rerankDuration = rerankResult.duration;
            console.log(`✓ Rerank 完成 (耗时: ${rerankDuration}ms)`);
            // 根据 Rerank 结果重新排序原始结果
            const rerankedResults = rerankResult.rankings.map((ranking) => {
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
        results.forEach((item, index) => {
            var _a, _b, _c, _d;
            console.log(`【结果 ${index + 1}】`);
            console.log(`  ID: ${item.id}`);
            if (useRerank && item.rerank_score !== undefined) {
                console.log(`  Rerank分数: ${item.rerank_score.toFixed(4)}`);
                console.log(`  原始分数: ${item.original_score.toFixed(4)}`);
                console.log(`  原始排序: #${item.original_index + 1}`);
            }
            else {
                console.log(`  相似度分数: ${item.score}`);
            }
            console.log(`  文档内容: ${(_b = (_a = item.fields) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.substring(0, 200)}${((_d = (_c = item.fields) === null || _c === void 0 ? void 0 : _c.document) === null || _d === void 0 ? void 0 : _d.length) > 200 ? '...' : ''}`);
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
    }
    catch (error) {
        console.error(`\n❌ 向量查询失败: ${error.message}`);
        if (axios_1.default.isAxiosError(error)) {
            console.error(`DashVector API 响应:`, JSON.stringify((_a = error.response) === null || _a === void 0 ? void 0 : _a.data));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlSYWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVyeVJhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUEwQjtBQUMxQixpQ0FBaUM7QUFDakMsNkJBQTZCO0FBRTdCLFNBQVM7QUFDVCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQVc1RDs7R0FFRztBQUNILEtBQUssVUFBVSxhQUFhLENBQUMsT0FLNUI7O0lBQ0csTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzdCLElBQUksQ0FBQztRQUNELE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFbkQsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN6QyxDQUFDO1FBRUQsbUJBQW1CO1FBQ25CLE1BQU0sU0FBUyxHQUFHLCtFQUErRSxDQUFDO1FBRWxHLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FDN0IsU0FBUyxFQUNUO1lBQ0ksS0FBSyxFQUFFLFlBQVk7WUFDbkIsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRSxLQUFLO2dCQUNaLFNBQVMsRUFBRSxTQUFTO2FBQ3ZCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLEtBQUssRUFBRSxJQUFJLElBQUksU0FBUyxDQUFDLE1BQU07Z0JBQy9CLGdCQUFnQixFQUFFLElBQUk7YUFDekI7U0FDSixFQUNEO1lBQ0ksT0FBTyxFQUFFO2dCQUNMLGVBQWUsRUFBRSxVQUFVLE1BQU0sRUFBRTtnQkFDbkMsY0FBYyxFQUFFLGtC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