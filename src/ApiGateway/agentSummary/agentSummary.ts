import { Inject, Controller, Post, Body } from "@midwayjs/core";
import { Context } from "@midwayjs/web";
import { ApiTags, ApiOperation, ApiResponse } from "@midwayjs/swagger";
import { AgentSummaryService } from "@/BussinessLayer/Agent/Application/Service/AgentSummaryService";
import { AgentRunRequestDTO } from "./summaryRunRequestDTO";
@ApiTags(["Agent摘要"])
@Controller("/api/v1/agentSummary")
export class SummaryController {
  @Inject()
  ctx: Context;

  @Inject()
  agentSummaryService: AgentSummaryService;

  @ApiOperation({ summary: "Agent摘要", description: "Agent摘要" })
  @ApiResponse({
    status: 200,
    description: "代码审查执行成功",
  })
  @Post("/run")
  async run(@Body() body: AgentRunRequestDTO) {
    const { variableMaps, sessionId, messages } = body;
    const { res } = this.ctx;
    res.writeHead(200, {
      "Content-Type": "application/json",
      "X-Accel-Buffering": "no",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.flushHeaders();
    await this.agentSummaryService.run({
      variableMaps,
      sessionId,
      messages,
    });
  }
}
