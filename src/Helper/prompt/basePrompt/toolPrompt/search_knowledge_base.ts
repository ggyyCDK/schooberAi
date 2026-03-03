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
- score_threshold: (required) Minimum similarity score. MUST be set to "0.4" or higher to ensure quality results.
- filter: (required) A JSON string specifying the filter criteria. You MUST analyze the user's question and set the appropriate category filter based on the content.
- use_rerank: (optional) Set to "true" to enable reranking for better relevance. Default is "true".
- rerank_top_n: (optional) Number of results to keep after reranking.

IMPORTANT - Filter Category Rules:
You MUST determine the correct category based on the user's question:
| User Question Topic | category value |
|---------------------|----------------|
| 羽毛球拍、球拍推荐、球拍参数、拍子选购 | "racket" |
| React、前端框架、组件开发、hooks | "react" |
| 羽毛球技术、打法、步伐、训练方法 | "tech" |

Filter Format:
The filter parameter must be a valid JSON string with the following structure:
{"must":[{"key":"category","match":{"value":"<category_value>"}}]}

Usage:
<search_knowledge_base>
<query>Your search query here</query>
<score_threshold>0.4</score_threshold>
<filter>{"must":[{"key":"category","match":{"value":"<category_value>"}}]}</filter>
<topk>5</topk>
</search_knowledge_base>

Example 1: User asks about badminton racket recommendations (羽毛球拍)
<search_knowledge_base>
<query>羽毛球拍推荐 进攻型</query>
<score_threshold>0.4</score_threshold>
<filter>{"must":[{"key":"category","match":{"value":"racket"}}]}</filter>
<topk>5</topk>
</search_knowledge_base>

Example 2: User asks about React hooks usage
<search_knowledge_base>
<query>React useEffect 最佳实践</query>
<score_threshold>0.4</score_threshold>
<filter>{"must":[{"key":"category","match":{"value":"react"}}]}</filter>
<topk>5</topk>
</search_knowledge_base>

Example 3: User asks about badminton technique (羽毛球技术)
<search_knowledge_base>
<query>羽毛球高远球技术要点</query>
<score_threshold>0.4</score_threshold>
<filter>{"must":[{"key":"category","match":{"value":"tech"}}]}</filter>
<topk>5</topk>
</search_knowledge_base>

Important Notes:
- ALWAYS include the filter parameter with the correct category based on user's question
- ALWAYS set score_threshold to 0.4 or higher
- Use this tool when you need factual information from the knowledge base
- The results include document content, similarity scores, and metadata
- Higher scores indicate more relevant results
- Enable reranking (use_rerank=true) for better accuracy on complex queries
- Results are returned in XML format with document content and metadata`
}
