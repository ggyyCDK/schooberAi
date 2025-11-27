import { Inject, Provide } from "@midwayjs/core";
import { Context } from "@midwayjs/web";
import { AiPrompt } from "@/Helper/Types/agent";
import { AiSessionService } from "./AiSessionService";
import { AiMessageService } from "./AiMessageService";
import { AiChatService } from "./AiChatService";
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

  @Inject()
  aiChatService: AiChatService;

  /**
   * 运行 AI Agent
   * @param command 运行参数
   * @returns Promise<void>
   */
  async run(command: {
    sessionId?: string;
    // promptId: string;
    workerId: string;
    businessType?: string;
    variableMaps: Record<string, any>;
    question: AiPrompt[];
  }): Promise<void> {
    // const { sessionId, workerId, businessType, variableMaps, question } =
    //   command;
    console.log("command_____________\/n", command, "command___________\/n", "command");
    // const LLMConfigParam = variableMaps.llmConfig ?? {}; //获取大模型配置
    // // const { ak, ApiUrl, cwdFormatted } = LLMConfigParam;
    // let isHistory = false; // 是否有历史记录，及是否是记忆模式
    // let isFirstRound = false; // 是否是第一次对话
    // let currentSession: AiSessionModel | null = null;
  }
}
