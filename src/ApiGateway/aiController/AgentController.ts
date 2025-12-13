import { Inject, Controller, Post, Get, Body, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { ApiTags, ApiOperation, ApiResponse } from '@midwayjs/swagger';
import { AgentRunRequestDTO } from './RequestDTO/AgentRunRequestDTO';
import { CompressSessionContextRequestDTO } from './RequestDTO/CompressSessionContextRequestDTO';
import { SaveChatMessagesRequestDTO } from './RequestDTO/SaveChatMessagesRequestDTO';
import { GetChatMessagesRequestDTO } from './RequestDTO/GetChatMessagesRequestDTO';
import { GetSessionListByPwdRequestDTO } from './RequestDTO/GetSessionListByPwdRequestDTO';
import { AgentService } from '@/BussinessLayer/Agent/Application/Service/AgentService';
import { AiMessageService } from '@/BussinessLayer/Agent/Application/Service/AiMessageService';
import { AiSessionService } from '@/BussinessLayer/Agent/Application/Service/AiSessionService';
import { ContextCompressionService } from '@/BussinessLayer/AiSummary/Application/service/contextCompressionService';

@ApiTags(['Agent服务'])
@Controller('/api/v1/agent')
export class AgentController {

  @Inject()
  ctx: Context;

  @Inject()
  agentService: AgentService;

  @Inject()
  aiMessageService: AiMessageService;

  @Inject()
  aiSessionService: AiSessionService;

  @Inject()
  contextCompressionService: ContextCompressionService;

  @ApiOperation({ summary: 'Agent聊天', description: 'Agent聊天' })
  @ApiResponse({
    status: 200,
    description: '代码审查执行成功',
  })
  @Post('/run')
  async run(@Body() body: AgentRunRequestDTO) {

    const { variableMaps, sessionId, question, workerId, sessionTitle, mcpHub, mcpHubDataInfo } = body;
    console.log('mcpHub, mcpHubDataInfo is', mcpHub, mcpHubDataInfo)
    const { res } = this.ctx;
    // 设置SSE响应头
    res.writeHead(200, {
      'Content-Type': 'text/event-stream', // 表示响应的内容类型是SSE格式的文本流
      'X-Accel-Buffering': 'no', // 表示响应的内容不应该被缓存，以保证实时性
      'Cache-Control': 'no-cache', // 表示响应的内容不应该被缓存，以保证实时性
      'Connection': 'keep-alive' //表示响应的连接应该保持打开，以便服务器端持续发送数据。 通常，客户端的请求中会包含特殊的头信息："Accept: text/event-event-stream" ，表示客户端系统接收 SSE 数据
    });
    res.flushHeaders();
    await this.agentService.run({
      variableMaps, sessionId, question, workerId, sessionTitle, mcpHub, mcpHubDataInfo
    })
  }

  @ApiOperation({ summary: '压缩会话上下文', description: '根据会话ID查询消息列表，压缩对话历史，生成摘要并保存' })
  @ApiResponse({
    status: 200,
    description: '压缩成功',
    schema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string', description: '会话ID' },
        compressedContent: { type: 'string', description: '压缩后的内容（包含system消息）' },
        originalMessageCount: { type: 'number', description: '原始消息数量' },
        filteredMessageCount: { type: 'number', description: '过滤后的消息数量' },
        systemMessageCount: { type: 'number', description: 'System消息数量' },
        lastMessageId: { type: 'string', description: '最后一条消息ID' }
      }
    }
  })
  @Post('/compress-context')
  async compressContext(@Body() body: CompressSessionContextRequestDTO) {
    try {
      const { sessionId, apiKey } = body;

      const result = await this.contextCompressionService.compressSessionContext(sessionId, apiKey);
      console.log('压缩完毕：', result)
      return {
        success: true,
        data: result,
        message: '会话上下文压缩成功'
      };
    } catch (error) {
      this.ctx.logger.error(`压缩会话上下文失败: ${error.message}`, error);
      return {
        success: false,
        data: null,
        message: `压缩失败: ${error.message}`
      };
    }
  }
  @ApiOperation({ summary: '保存历史对话chatmessages', description: '保存历史对话chatmessages' })
  @ApiResponse({
    status: 200,
    description: '保存成功',
  })
  @Post('/save-chatmessages')
  async saveChatMessages(@Body() body: SaveChatMessagesRequestDTO) {
    try {
      const { sessionId, chatMessage } = body;
      console.log('sessionId, chatMessage is', sessionId, chatMessage)
      await this.aiMessageService.saveChatMessage(sessionId, chatMessage);
      return {
        success: true,
        data: null,
        message: '历史对话chatmessages保存成功'
      };
    } catch (error) {
      this.ctx.logger.error(`保存历史对话chatmessages失败: ${error.message}`, error);
      return {
        success: false,
        data: null,
        message: `保存失败: ${error.message}`
      };
    }
  }

  @ApiOperation({ summary: '获取会话消息列表', description: '根据会话ID获取消息列表' })
  @ApiResponse({
    status: 200,
    description: '获取成功',
  })
  @Get('/get-chatmessages')
  async getChatMessages(@Query() query: GetChatMessagesRequestDTO) {
    try {
      const { sessionId } = query;
      const result = await this.aiMessageService.getChatMessages(sessionId);
      return {
        success: true,
        data: result,
        message: '获取会话消息列表成功'
      };
    } catch (error) {
      this.ctx.logger.error(`获取会话消息列表失败: ${error.message}`, error);
      return {
        success: false,
        data: null,
        message: `获取失败: ${error.message}`
      };
    }
  }

  @ApiOperation({ summary: '根据pwd获取会话列表', description: '根据pwd获取会话列表' })
  @ApiResponse({
    status: 200,
    description: '获取成功',
  })
  @Post('/get-session-list-by-pwd')
  async getSessionListByPwd(@Body() body: GetSessionListByPwdRequestDTO) {
    try {
      const { pwd } = body;
      const result = await this.aiSessionService.listByCurPwd(pwd);
      return {
        success: true,
        data: result,
        message: '获取会话列表成功'
      };
    } catch (error) {
      this.ctx.logger.error(`获取会话列表失败: ${error.message}`, error);
      return {
        success: false,
        data: null,
        message: `获取失败: ${error.message}`
      };
    }
  }
}
