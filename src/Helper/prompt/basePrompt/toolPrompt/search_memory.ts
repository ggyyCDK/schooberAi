export function getSearchMemoryDescription(): string {
    return `## search_memory
Description: Search through historical conversation memories to find relevant past discussions. This tool allows you to retrieve context from previous conversations when you need information about what was discussed before. Use this tool when:
- The user mentions something that was discussed previously (e.g., "之前", "上次", "我们讨论过")
- You need to recall past decisions or implementations
- The user references previous work without providing full context
- You need historical context to make informed decisions

Parameters:
- query: (required) Search keywords to find relevant memories. Can include multiple keywords separated by spaces or commas. Supports both English technical terms and Chinese keywords.
- limit: (optional) Maximum number of results to return. Default is 10.

Usage:
<search_memory>
<query>Your search keywords here</query>
<limit>number of results (optional)</limit>
</search_memory>

Example 1: Search for previous discussions about authentication
<search_memory>
<query>authentication login user</query>
<limit>5</limit>
</search_memory>

Example 2: Search for Chinese keywords about configuration
<search_memory>
<query>配置 数据库 连接</query>
</search_memory>

Important Notes:
- DO NOT use this tool at the start of every conversation automatically
- Only use when the user explicitly references previous discussions or when you need historical context
- The tool returns conversation entries with relevance scores, timestamps, and content previews
- Results are sorted by relevance to your query`
}
