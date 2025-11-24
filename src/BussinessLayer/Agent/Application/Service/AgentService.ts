import { Inject, Provide } from "@midwayjs/core";
import { Context } from "@midwayjs/web";
import { AiPrompt, AimessageType } from '@/Helper/Types/agent'
import { AiSessionService } from "./AiSessionService";
import { AiMessageService } from "./AiMessageService";
import { AiChatService } from "./AiChatService";
import { AiSessionModel } from "../../Domain/Agent/AiSession";
import { AiMessageModel } from "../../Domain/Agent/AiMessage";
import { EventType } from "@/Helper/Types/parseResult";
import { basicSystemPrompt } from '@/Helper/prompt/basePrompt/systemPrompt/systemPrompt'
@Provide()
export class AgentService {
    @Inject()
    ctx: Context

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
        variableMaps: Record<string, any>,
        question: AiPrompt[]

    }): Promise<void> {
        const { sessionId, workerId, businessType, variableMaps, question } = command;
        const LLMConfigParam = variableMaps.llmConfig ?? {} //获取大模型配置
        const { ak, ApiUrl, cwdFormatted } = LLMConfigParam
        let isHistory = false; // 是否有历史记录，及是否是记忆模式
        let isFirstRound = false; // 是否是第一次对话
        let currentSession: AiSessionModel | null = null;

        try {
            // 如果传入了 sessionId，尝试查找现有会话
            if (sessionId) {
                this.ctx.logger.info(`查找会话: ${sessionId}`);
                currentSession = await this.aiSessionService.findById(sessionId);

                if (currentSession) {
                    isHistory = true;
                    this.ctx.logger.info(`找到历史会话: ${sessionId}`);
                } else {
                    this.ctx.logger.warn(`未找到会话 ${sessionId}，将创建新会话`);
                }
            }

            // 如果没有找到会话，创建新会话
            if (!currentSession) {
                this.ctx.logger.info(`创建新会话，workerId: ${workerId}`);
                isFirstRound = true;

                currentSession = await this.aiSessionService.create({
                    sessionId: sessionId,
                    workerId: workerId,
                    businessType: businessType,
                    name: `会话_${new Date().getTime()}`,
                    ext: {
                        promptId: '',
                        variableMaps: variableMaps
                    }
                });

                this.ctx.logger.info(`创建会话成功: ${currentSession.id}`);
            }

            this.ctx.logger.info(`会话模式 - 是否有历史: ${isHistory}, 是否首轮: ${isFirstRound}`);
            this.ctx.logger.info(`问题数量: ${question.length}`);

        } catch (error) {
            this.ctx.logger.error(`Agent 运行失败: ${error.message}`, error);
            throw new Error(`Agent 运行失败: ${error.message}`);
        }
        //下面都为首轮对话逻辑
        //构建系统提示词
        const systemPrompt = basicSystemPrompt(cwdFormatted)

        let finalPromptList: AiPrompt[] = [{ role: 'system', content: systemPrompt }]
        //格式兼容
        if (Array.isArray(question)) {
            finalPromptList.push(...question)
        } else {
            finalPromptList.push({ role: 'user', content: question })
        }

        if (isHistory && !isFirstRound && sessionId) {
            const historyMessages = await this.aiMessageService.listBySessionId(sessionId)
            if (historyMessages.length > 0) {
                await this.multiRoundChat({
                    sessionId,
                    workerId,
                    messages: question,
                    historyMessages,
                    variableMaps
                })
                return
            }
        }
        //如果有session，则记录用户输入
        if (sessionId) {
            this.aiMessageService.createAiMessage({
                sessionId,
                fromType: AimessageType.UserInput,
                messageContent: finalPromptList,
                workerId: 'guyu',
                llmConfig: {
                    ApiUrl, cwdFormatted
                }
            })
        }

        let responseContent = '';

        await this.aiChatService.aiChatWithStream({
            model: LLMConfigParam.model ?? 'claude_sonnet4_5',
            messages: finalPromptList,
            ak,
            ApiUrl,
            // timeout: LLMConfigParam.timeout,
            stream: true,
            onMessage: (message, type) => {
                this.ctx.res.write(JSON.stringify(message) + '\n\n');
                if (message.eventType === EventType.Message) {
                    responseContent += message.content
                }
            },
            onCompleted: message => {
                //完成时，记录ai完整回复
                if (sessionId) {
                    this.aiMessageService.createAiMessage({
                        sessionId,
                        fromType: AimessageType.LLMResponse,
                        messageContent: [{ role: 'assistant', content: responseContent }],
                        workerId: 'guyu',
                        llmConfig: {
                            ApiUrl, cwdFormatted
                        }
                    })
                }
            }
        })
    }

    /**
     * multiRoundChat 多轮对话方法参数
     * @param command 
     *   - sessionId: string，会话ID，用于标识当前多轮对话所属会话
     *   - workerId: string，发起对话的worker的ID
     *   - messages: AiPrompt[]，本轮用户输入的消息内容数组
     *   - historyMessages: AiMessageModel[]，该会话的已存在历史消息列表
     *   - variableMaps: Record<string, any>，额外参数，例如大模型配置、用户自定义参数等
     */
    private async multiRoundChat(command: {
        sessionId: string;
        workerId: string;
        messages: AiPrompt[];
        historyMessages: AiMessageModel[];
        variableMaps: Record<string, any>
    }): Promise<void> {
        const { sessionId, workerId = 'guyu', messages, variableMaps } = command;
        const LLMConfigParam = variableMaps.llmConfig ?? {} //获取大模型配置
        const { ak, ApiUrl, cwdFormatted } = LLMConfigParam
        //首先查找session,因为进到这里的肯定是有历史会话的，肯定有session，没有则抛出错误
        const session = await this.aiSessionService.findById(sessionId);
        if (!session) {
            throw new Error(`session not found 会话不存在: ${sessionId}`);
        }
        this.ctx.logger.info(`开始多轮对话, sessionId: ${sessionId}, 历史消息数: ${command.historyMessages.length}`);

        //下面执行多轮对话逻辑

        //step 1 （获取历史消息）
        const historyMessages = command.historyMessages
        if (!historyMessages || historyMessages.length === 0) {
            throw new Error(`history messages not found 历史消息不存在: ${sessionId}`);
        }

        //step 2 （构建完整的对话历史）
        let finalPromptList: AiPrompt[] = [];
        //按创建时间顺序添加历史消息
        historyMessages.sort((a, b) => a.createDate.getTime() - b.createDate.getTime()).forEach(message => {
            if (Array.isArray(message.messageContent)) {
                finalPromptList.push(...message.messageContent)
            }
        })

        //step 3 （添加新的消息）
        finalPromptList.push(...messages);

        //step 4 （构建回复内容）
        let responseContent = '';
        // let talkUsage: any = null

        //step 5 （先保存用户输入信息）
        await this.aiMessageService.createAiMessage({
            sessionId,
            fromType: AimessageType.UserInput,
            messageContent: messages,
            workerId,
            llmConfig: { ApiUrl, cwdFormatted }
        })

        //step 6 （调用Ai服务进行流式对话）
        await this.aiChatService.aiChatWithStream({
            model: LLMConfigParam.model ?? 'claude_sonnet4_5',
            messages: finalPromptList,
            ak,
            ApiUrl,
            timeout: LLMConfigParam.timeout,
            stream: true,
            onMessage: (message, type) => {
                this.ctx.res.write(JSON.stringify(message) + '\n\n');
                if (message.eventType === EventType.Message) {
                    responseContent += message.content
                }

            },
            onCompleted: message => {
                //完成时，记录ai完整回复
                if (sessionId) {
                    this.aiMessageService.createAiMessage({
                        sessionId,
                        fromType: AimessageType.LLMResponse,
                        messageContent: [{ role: 'assistant', content: responseContent }],
                        workerId: 'guyu',
                        llmConfig: { ApiUrl, cwdFormatted }
                    })
                }
            }
        })
    }
}