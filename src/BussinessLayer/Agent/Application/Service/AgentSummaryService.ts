import { Inject, Provide } from "@midwayjs/core";
import { Context } from "@midwayjs/web";
import { AiPrompt } from "@/Helper/Types/agent";
import { AiSessionService } from "./AiSessionService";
import { AiMessageService } from "./AiMessageService";
// import { AiSessionModel } from "../../Domain/Agent/AiSession";
// import { AiMessageModel } from "../../Domain/Agent/AiMessage";
// import { EventType } from "@/Helper/Types/parseResult";
// import { basicSystemPrompt } from "@/Helper/prompt/basePrompt/systemPrompt/systemPrompt";
@Provide()
export class AgentSummaryService {
  @Inject()
  ctx: Context;

  @Inject()
  aiSessionService: AiSessionService;

  @Inject()
  aiMessageService: AiMessageService;

  /**
   * 运行 AI Agent
   * @param command 运行参数
   * @returns Promise<void>
   */
  async run(command: {
    sessionId?: string;
    variableMaps: Record<string, any>;
    messages: AiPrompt[];
  }): Promise<void> {
    // const { sessionId, variableMaps, question } = command;
    const historyMessages = await this.aiMessageService.listBySessionId(
      command.sessionId
    );
    console.log(
      "historyMessages---------/\n",
      historyMessages,
      "/\nhistoryMessages----------"
    );
  }
}
