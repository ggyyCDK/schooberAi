export function getSearchKnowledgeBaseDescription(): string {
    return `## search_knowledge_base
Description: Search through the RAG knowledge base to find relevant documents. This tool queries the Qdrant vector database to retrieve semantically similar documents that can help answer user questions. Use this tool when:
- The user asks questions that may require knowledge from project documentation
- You need to find technical specifications, API documentation, or design docs
- The user references knowledge base content (e.g., "根据知识库", "文档里", "之前记录的")
- You need authoritative information about project-specific topics

Parameters:
- query: (required) The search query text describing what you want to find. Use clear, descriptive keywords.
- collection: (optional) The name of the knowledge base collection to search. Uses the configured default if not specified.
- topk: (optional) Number of results to return. Default is 5, range 1-20.
- score_threshold: (optional) Minimum similarity score (0-1) for results. Only returns documents with scores above this threshold.
- use_rerank: (optional) Set to "true" to enable reranking for better relevance. Default is "false".
- rerank_top_n: (optional) Number of results to keep after reranking.

Usage:
<search_knowledge_base>
<query>Your search query here</query>
<collection>collection_name (optional)</collection>
<topk>number of results (optional)</topk>
<score_threshold>0.7 (optional)</score_threshold>
<use_rerank>true/false (optional)</use_rerank>
<rerank_top_n>3 (optional)</rerank_top_n>
</search_knowledge_base>

Example 1: Search for authentication implementation details
<search_knowledge_base>
<query>用户认证 JWT Token 实现方式</query>
<topk>5</topk>
</search_knowledge_base>

Example 2: Search with reranking for better accuracy
<search_knowledge_base>
<query>database connection configuration</query>
<collection>project_docs</collection>
<use_rerank>true</use_rerank>
<rerank_top_n>3</rerank_top_n>
</search_knowledge_base>

Example 3: Search with score threshold
<search_knowledge_base>
<query>API接口文档 错误处理</query>
<score_threshold>0.6</score_threshold>
</search_knowledge_base>

Important Notes:
- Use this tool when you need factual information from the knowledge base
- The results include document content, similarity scores, and metadata
- Higher scores indicate more relevant results
- Enable reranking (use_rerank=true) for better accuracy on complex queries
- Results are returned in XML format with document content and metadata`
}
