import { AiPrompt } from "@/Helper/Types/agent";
import { ApiProperty } from "@midwayjs/swagger";
import { IsObject, IsOptional, IsString } from "class-validator";
import LLMCONFIG from "@/config/llmConfig";
/**
 * 变量映射对象
 */
export class AgentRunRequestDTO {
  @ApiProperty({
    description: "会话ID",
    example: "GUYUTEST1",
  })
  @IsString()
  @IsOptional()
  sessionId?: string;

  @ApiProperty({
    description: "变量映射",
    example: {
      llmConfig: LLMCONFIG,
    },
  })
  @IsString()
  @IsObject()
  variableMaps?: Record<string, string>;

  @ApiProperty({
    description: "需要被摘要的历史聊天记录",
  })
  messages: AiPrompt[];
}
