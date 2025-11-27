import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { ApiTags, ApiOperation, ApiResponse } from '@midwayjs/swagger';
import { AgentSummaryService } from '@/BussinessLayer/Agent/Application/Service/AgentSummaryService'
import { AgentRunRequestDTO } from './summaryRunRequestDTO';
import * as os from 'os'
@ApiTags(['Agent摘要'])
@Controller('/api/v1/agentSummary')
export class SummaryController {

  @Inject()
  ctx: Context;

  @Inject()
  agentSummaryService: AgentSummaryService

  @ApiOperation({ summary: 'Agent摘要', description: 'Agent摘要' })
  @ApiResponse({
    status: 200,
    description: '代码审查执行成功',
  })
  @Post('/run')
  async run(@Body() body: AgentRunRequestDTO) {
    console.log('os is:', os)

    const { variableMaps, sessionId, question, workerId } = body;
    const { res } = this.ctx;
    // 设置SSE响应头
    res.writeHead(200, {
      'Content-Type': 'text/event-stream', // 表示响应的内容类型是SSE格式的文本流
      'X-Accel-Buffering': 'no', // 表示响应的内容不应该被缓存，以保证实时性
      'Cache-Control': 'no-cache', // 表示响应的内容不应该被缓存，以保证实时性
      'Connection': 'keep-alive' //表示响应的连接应该保持打开，以便服务器端持续发送数据。 通常，客户端的请求中会包含特殊的头信息："Accept: text/event-stream" ，表示客户端系统接收 SSE 数据
    });
    res.flushHeaders();
    await this.agentSummaryService.run({
      variableMaps, sessionId, question, workerId
    })
  }
}
