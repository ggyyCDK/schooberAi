# API参考

<cite>
**本文档中引用的文件**  
- [AgentController.ts](file://src/ApiGateway/aiController/AgentController.ts)
- [RagController.ts](file://src/ApiGateway/controller/RagController.ts)
- [CodeReviewcontroller.ts](file://src/ApiGateway/controller/CodeReviewcontroller.ts)
- [AgentRunRequestDTO.ts](file://src/ApiGateway/aiController/RequestDTO/AgentRunRequestDTO.ts)
- [CompressSessionContextRequestDTO.ts](file://src/ApiGateway/aiController/RequestDTO/CompressSessionContextRequestDTO.ts)
- [RagInsertRequestDTO.ts](file://src/ApiGateway/controller/RequestDTO/RagInsertRequestDTO.ts)
- [RagQueryRequestDTO.ts](file://src/ApiGateway/controller/RequestDTO/RagQueryRequestDTO.ts)
- [codeReviewRequestDTO.ts](file://src/ApiGateway/controller/RequestDTO/codeReviewRequestDTO.ts)
- [parse.ts](file://src/Helper/ParseSSE/parse.ts)
- [parseResult.ts](file://src/Helper/ParseSSE/parseResult.ts)
- [agent.ts](file://src/Helper/Types/agent.ts)
</cite>

## 目录
1. [简介](#简介)
2. [/api/v1/agent/run（Agent聊天）](#apiv1agentrunagent聊天)
3. [/api/v1/agent/compress-context（压缩会话上下文）](#apiv1agentcompress-context压缩会话上下文)
4. [/api/v1/rag/query（RAG查询）](#apiv1ragqueryrag查询)
5. [/api/v1/rag/insert（RAG插入）](#apiv1raginsertrag插入)
6. [/api/v1/code-review（代码审查）](#apiv1code-review代码审查)
7. [流式响应SSE实现细节](#流式响应sse实现细节)
8. [通用响应结构](#通用响应结构)

## 简介
本文档为schooberAi项目提供详细的API参考文档，涵盖Agent聊天、会话上下文压缩、RAG查询与插入以及代码审查等核心功能。每个API端点均提供HTTP方法、URL路径、请求/响应格式、认证要求及使用示例。特别说明了流式API的SSE实现机制，并提供curl命令示例以方便测试和集成。

## /api/v1/agent/run（Agent聊天）

提供Agent聊天功能，支持流式响应（SSE），适用于实时对话场景。

### 请求信息
- **HTTP方法**: `POST`
- **URL路径**: `/api/v1/agent/run`
- **认证要求**: 无显式认证字段，依赖上下文会话管理

### 请求DTO（AgentRunRequestDTO）
请求体为JSON格式，包含以下字段：

| 字段名 | 类型 | 是否必填 | 描述 | 示例值 |
|--------|------|----------|------|--------|
| `mcpHub` | boolean | 否 | 是否启用MCP Hub | `false` |
| `mcpHubDataInfo` | array | 否 | MCP Hub数据信息 | `[]` |
| `sessionId` | string | 否 | 会话ID | `"GUYUTEST1"` |
| `sessionTitle` | string | 否 | 会话标题 | `"会话标题"` |
| `workerId` | string | 否 | 使用者工号 | `"worker001"` |
| `variableMaps` | object | 否 | 变量映射，包含LLM配置等 | 见下方示例 |
| `question` | array | 是 | 用户问题列表，每项包含role和content | 见下方示例 |

#### variableMaps 示例
```json
{
  "llmConfig": {
    "cwdFormatted": "/",
    "model": "claude-sonnet-4-5-20250929",
    "ak": "",
    "ApiUrl": ""
  }
}
```

#### question 示例
```json
[
  {
    "role": "user",
    "content": "你好，请介绍一下你自己"
  }
]
```

### 响应格式
此接口采用**服务器发送事件（SSE）** 流式传输，响应头设置如下：
```
Content-Type: text/event-stream
X-Accel-Buffering: no
Cache-Control: no-cache
Connection: keep-alive
```

消息以`data:`字段逐行发送，最终以`[DONE]`标记结束。

### curl 示例
```bash
curl -X POST http://localhost:3000/api/v1/agent/run \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_123",
    "question": [
      {
        "role": "user",
        "content": "你好"
      }
    ],
    "variableMaps": {}
  }'
```

**Section sources**
- [AgentController.ts](file://src/ApiGateway/aiController/AgentController.ts#L38-L55)
- [AgentRunRequestDTO.ts](file://src/ApiGateway/aiController/RequestDTO/AgentRunRequestDTO.ts#L7-L74)

## /api/v1/agent/compress-context（压缩会话上下文）

根据会话ID查询消息列表，压缩对话历史，生成摘要并保存。

### 请求信息
- **HTTP方法**: `POST`
- **URL路径**: `/api/v1/agent/compress-context`
- **认证要求**: 可选API Key用于权限控制

### 请求DTO（CompressSessionContextRequestDTO）
| 字段名 | 类型 | 是否必填 | 描述 | 示例值 |
|--------|------|----------|------|--------|
| `sessionId` | string | 是 | 会话ID | `"session_12345"` |
| `apiKey` | string | 否 | API密钥 | `"sk-xxxxxxxx"` |

### 成功响应示例
```json
{
  "success": true,
  "data": {
    "sessionId": "session_12345",
    "compressedContent": "系统消息：已压缩历史对话...",
    "originalMessageCount": 20,
    "filteredMessageCount": 15,
    "systemMessageCount": 2,
    "lastMessageId": "msg_98765"
  },
  "message": "会话上下文压缩成功"
}
```

### 错误响应示例
```json
{
  "success": false,
  "data": null,
  "message": "压缩失败: 会话不存在"
}
```

### curl 示例
```bash
curl -X POST http://localhost:3000/api/v1/agent/compress-context \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_12345",
    "apiKey": "sk-xxxxxxxx"
  }'
```

**Section sources**
- [AgentController.ts](file://src/ApiGateway/aiController/AgentController.ts#L73-L92)
- [CompressSessionContextRequestDTO.ts](file://src/ApiGateway/aiController/RequestDTO/CompressSessionContextRequestDTO.ts#L7-L24)

## /api/v1/rag/query（RAG查询）

根据文本查询相似的向量数据，支持重排序（Rerank）功能。

### 请求信息
- **HTTP方法**: `POST`
- **URL路径**: `/api/v1/rag/query`
- **认证要求**: 通过环境变量配置API Key（`dashvectorApiKey`, `dashscopeApiKey`）

### 请求DTO（RagQueryRequestDTO）
| 字段名 | 类型 | 是否必填 | 描述 | 默认值 | 示例值 |
|--------|------|----------|------|--------|--------|
| `text` | string | 是 | 查询文本 | - | `"如何使用向量数据库"` |
| `topk` | number | 否 | 返回最相似结果数量 | 10 | `10` |
| `includeVector` | boolean | 否 | 是否返回向量数据 | false | `false` |
| `useRerank` | boolean | 否 | 是否启用Rerank重新排序 | false | `true` |
| `rerankTopN` | number | 否 | Rerank返回的Top N结果数量 | - | `5` |

### 成功响应示例
```json
{
  "success": true,
  "data": {
    "total": 10,
    "results": [...],
    "timing": {
      "vectorization": 120,
      "query": 80,
      "rerank": 60,
      "service": 260,
      "controller": 280,
      "framework_overhead": 20
    }
  },
  "message": "RAG查询成功"
}
```

### 错误响应示例
```json
{
  "success": false,
  "data": null,
  "message": "查询失败: 向量服务不可用"
}
```

### curl 示例
```bash
curl -X POST http://localhost:3000/api/v1/rag/query \
  -H "Content-Type: application/json" \
  -d '{
    "text": "如何使用向量数据库",
    "topk": 5,
    "useRerank": true,
    "rerankTopN": 3
  }'
```

**Section sources**
- [RagController.ts](file://src/ApiGateway/controller/RagController.ts#L23-L86)
- [RagQueryRequestDTO.ts](file://src/ApiGateway/controller/RequestDTO/RagQueryRequestDTO.ts#L4-L50)

## /api/v1/rag/insert（RAG插入）

向RAG知识库插入数据，将文本向量化后存储到DashVector。

### 请求信息
- **HTTP方法**: `POST`
- **URL路径**: `/api/v1/rag/insert`
- **认证要求**: 通过环境变量配置API Key（`DASHVECTOR_API_KEY`, `DASHSCOPE_API_KEY`）

### 请求DTO（RagInsertRequestDTO）
| 字段名 | 类型 | 是否必填 | 描述 | 示例值 |
|--------|------|----------|------|--------|
| `text` | string | 是 | 需要向量化存储的文本内容 | `"这是一段需要向量化存储的文本内容"` |
| `docId` | string | 否 | 文档ID（不传则自动生成） | `"doc_001"` |

### 成功响应示例
```json
{
  "success": true,
  "data": {
    "id": "doc_001",
    "status": "inserted"
  },
  "message": "RAG数据插入成功"
}
```

### 错误响应示例
```json
{
  "success": false,
  "data": null,
  "message": "插入失败: 文本为空"
}
```

### curl 示例
```bash
curl -X POST http://localhost:3000/api/v1/rag/insert \
  -H "Content-Type: application/json" \
  -d '{
    "text": "这是一段测试文本",
    "docId": "doc_001"
  }'
```

**Section sources**
- [RagController.ts](file://src/ApiGateway/controller/RagController.ts#L102-L128)
- [RagInsertRequestDTO.ts](file://src/ApiGateway/controller/RequestDTO/RagInsertRequestDTO.ts#L4-L20)

## /api/v1/code-review（代码审查）

执行代码审查任务，支持流式响应输出审查过程。

### 请求信息
- **HTTP方法**: `POST`
- **URL路径**: `/api/v1/code-review/runUser`
- **认证要求**: 无显式认证字段

### 请求DTO（CodeReviewDto）
请求体包含`variableMaps`对象，结构如下：

| 字段名 | 类型 | 是否必填 | 描述 | 示例值 |
|--------|------|----------|------|--------|
| `workDir` | string | 是 | 工作目录路径 | `"/path/to/workspace"` |
| `question` | string | 是 | 用户问题 | `"你是谁"` |
| `stream` | boolean | 是 | 是否使用流式响应 | `true` |

### 响应格式
此接口同样采用**SSE流式响应**，响应头设置与`/api/v1/agent/run`一致。

消息格式遵循SSE标准，包含`data:`字段，最终以`[DONE]`结束。

### curl 示例
```bash
curl -X POST http://localhost:3000/api/v1/code-review/runUser \
  -H "Content-Type: application/json" \
  -d '{
    "variableMaps": {
      "workDir": "/path/to/project",
      "question": "请审查这段代码",
      "stream": true
    }
  }'
```

**Section sources**
- [CodeReviewcontroller.ts](file://src/ApiGateway/controller/CodeReviewcontroller.ts#L21-L36)
- [codeReviewRequestDTO.ts](file://src/ApiGateway/controller/RequestDTO/codeReviewRequestDTO.ts#L29-L35)

## 流式响应SSE实现细节

本系统中多个API端点（如`/api/v1/agent/run`和`/api/v1/code-review/runUser`）采用**服务器发送事件（Server-Sent Events, SSE）** 实现流式响应。

### 响应头设置
```http
HTTP/1.1 200 OK
Content-Type: text/event-stream
X-Accel-Buffering: no
Cache-Control: no-cache
Connection: keep-alive
```

- `Content-Type: text/event-stream`：指定内容类型为SSE流
- `X-Accel-Buffering: no`：禁用Nginx等代理的缓冲，确保实时性
- `Cache-Control: no-cache`：禁止缓存响应内容
- `Connection: keep-alive`：保持连接打开以便持续发送数据

### 消息格式
每条消息遵循SSE标准格式：
```
data: {"delta":{"content":"部分响应内容"}}
\n
```

多行数据使用`\n`分隔，最终以特殊标记`[DONE]`表示流结束。

### 客户端解析
客户端可通过`EventSource`或流式读取方式处理响应。项目中提供了`parse.ts`工具用于解析SSE字节流为结构化消息。

**Section sources**
- [AgentController.ts](file://src/ApiGateway/aiController/AgentController.ts#L44-L50)
- [CodeReviewcontroller.ts](file://src/ApiGateway/controller/CodeReviewcontroller.ts#L28-L34)
- [parse.ts](file://src/Helper/ParseSSE/parse.ts#L1-L184)
- [parseResult.ts](file://src/Helper/ParseSSE/parseResult.ts#L10-L60)

## 通用响应结构

除流式API外，其他API均返回统一的JSON响应结构：

### 成功响应
```json
{
  "success": true,
  "data": { /* 具体数据 */ },
  "message": "操作成功"
}
```

### 失败响应
```json
{
  "success": false,
  "data": null,
  "message": "错误描述信息"
}
```

所有非流式接口均遵循此结构，便于前端统一处理。

**Section sources**
- [AgentController.ts](file://src/ApiGateway/aiController/AgentController.ts#L80-L84)
- [RagController.ts](file://src/ApiGateway/controller/RagController.ts#L74-L85)
- [CodeReviewcontroller.ts](file://src/ApiGateway/controller/CodeReviewcontroller.ts#L26-L27)