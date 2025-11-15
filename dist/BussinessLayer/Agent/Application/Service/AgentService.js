"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentService = void 0;
const core_1 = require("@midwayjs/core");
const agent_1 = require("../../../../Helper/Types/agent");
const AiSessionService_1 = require("./AiSessionService");
const AiMessageService_1 = require("./AiMessageService");
const AiChatService_1 = require("./AiChatService");
const systemPrompt_1 = require("../../../../Helper/prompt/basePrompt/systemPrompt/systemPrompt");
let AgentService = class AgentService {
    /**
     * 运行 AI Agent
     * @param command 运行参数
     * @returns Promise<void>
     */
    async run(command) {
        var _a;
        const { sessionId, workerId, businessType, variableMaps, question } = command;
        const LLMConfigParam = (_a = variableMaps.llmConfig) !== null && _a !== void 0 ? _a : {}; //获取大模型配置
        const { ak, ApiUrl, cwdFormatted } = LLMConfigParam;
        let isHistory = false; // 是否有历史记录，及是否是记忆模式
        let isFirstRound = false; // 是否是第一次对话
        let currentSession = null;
        try {
            // 如果传入了 sessionId，尝试查找现有会话
            if (sessionId) {
                this.ctx.logger.info(`查找会话: ${sessionId}`);
                currentSession = await this.aiSessionService.findById(sessionId);
                if (currentSession) {
                    isHistory = true;
                    this.ctx.logger.info(`找到历史会话: ${sessionId}`);
                }
                else {
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
        }
        catch (error) {
            this.ctx.logger.error(`Agent 运行失败: ${error.message}`, error);
            throw new Error(`Agent 运行失败: ${error.message}`);
        }
        //下面都为首轮对话逻辑
        //构建系统提示词
        const systemPrompt = (0, systemPrompt_1.basicSystemPrompt)(cwdFormatted);
        let finalPromptList = [{ role: 'system', content: systemPrompt }];
        //格式兼容
        if (Array.isArray(question)) {
            finalPromptList.push(...question);
        }
        else {
            finalPromptList.push({ role: 'user', content: question });
        }
        if (isHistory && !isFirstRound && sessionId) {
            const historyMessages = await this.aiMessageService.listBySessionId(sessionId);
            if (historyMessages.length > 0) {
                await this.multiRoundChat({
                    sessionId,
                    workerId,
                    messages: question,
                    historyMessages,
                    variableMaps
                });
                return;
            }
        }
        //如果有session，则记录用户输入
        if (sessionId) {
            this.aiMessageService.createAiMessage({
                sessionId,
                fromType: agent_1.AimessageType.UserInput,
                messageContent: finalPromptList,
                workerId: 'guyu',
                llmConfig: LLMConfigParam
            });
        }
        let responseContent = '';
        await this.aiChatService.aiChatWithStream({
            model: 'claude_sonnet4',
            messages: finalPromptList,
            ak,
            ApiUrl,
            // timeout: LLMConfigParam.timeout,
            stream: true,
            onMessage: message => {
                responseContent += message.content;
                this.ctx.res.write('data: ' + JSON.stringify(message) + '\n\n');
            },
            onCompleted: message => {
                //完成时，记录ai完整回复
                if (sessionId) {
                    this.aiMessageService.createAiMessage({
                        sessionId,
                        fromType: agent_1.AimessageType.LLMResponse,
                        messageContent: [{ role: 'assistant', content: responseContent }],
                        workerId: 'guyu',
                        llmConfig: LLMConfigParam
                    });
                }
            }
        });
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
    async multiRoundChat(command) {
        var _a, _b;
        const { sessionId, workerId = 'guyu', messages, variableMaps } = command;
        const LLMConfigParam = (_a = variableMaps.llmConfig) !== null && _a !== void 0 ? _a : {}; //获取大模型配置
        const { ak, ApiUrl } = LLMConfigParam;
        //首先查找session,因为进到这里的肯定是有历史会话的，肯定有session，没有则抛出错误
        const session = await this.aiSessionService.findById(sessionId);
        if (!session) {
            throw new Error(`session not found 会话不存在: ${sessionId}`);
        }
        this.ctx.logger.info(`开始多轮对话, sessionId: ${sessionId}, 历史消息数: ${command.historyMessages.length}`);
        //下面执行多轮对话逻辑
        //step 1 （获取历史消息）
        const historyMessages = command.historyMessages;
        if (!historyMessages || historyMessages.length === 0) {
            throw new Error(`history messages not found 历史消息不存在: ${sessionId}`);
        }
        //step 2 （构建完整的对话历史）
        let finalPromptList = [];
        //按创建时间顺序添加历史消息
        historyMessages.sort((a, b) => a.createDate.getTime() - b.createDate.getTime()).forEach(message => {
            if (Array.isArray(message.messageContent)) {
                finalPromptList.push(...message.messageContent);
            }
        });
        //step 3 （添加新的消息）
        finalPromptList.push(...messages);
        //step 4 （构建回复内容）
        let responseContent = '';
        //step 5 （先保存用户输入信息）
        await this.aiMessageService.createAiMessage({
            sessionId,
            fromType: agent_1.AimessageType.UserInput,
            messageContent: messages,
            workerId,
            llmConfig: LLMConfigParam
        });
        //step 6 （调用Ai服务进行流式对话）
        await this.aiChatService.aiChatWithStream({
            model: (_b = LLMConfigParam.model) !== null && _b !== void 0 ? _b : 'claude_sonnet4',
            messages: finalPromptList,
            ak,
            ApiUrl,
            timeout: LLMConfigParam.timeout,
            stream: true,
            onMessage: message => {
                responseContent += message.content;
                this.ctx.res.write('data: ' + JSON.stringify(message) + '\n\n');
            },
            onCompleted: message => {
                //完成时，记录ai完整回复
                if (sessionId) {
                    this.aiMessageService.createAiMessage({
                        sessionId,
                        fromType: agent_1.AimessageType.LLMResponse,
                        messageContent: [{ role: 'assistant', content: responseContent }],
                        workerId: 'guyu',
                        llmConfig: LLMConfigParam
                    });
                }
            }
        });
    }
};
exports.AgentService = AgentService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], AgentService.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", AiSessionService_1.AiSessionService)
], AgentService.prototype, "aiSessionService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", AiMessageService_1.AiMessageService)
], AgentService.prototype, "aiMessageService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", AiChatService_1.AiChatService)
], AgentService.prototype, "aiChatService", void 0);
exports.AgentService = AgentService = __decorate([
    (0, core_1.Provide)()
], AgentService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbnRTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL0J1c3NpbmVzc0xheWVyL0FnZW50L0FwcGxpY2F0aW9uL1NlcnZpY2UvQWdlbnRTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFpRDtBQUVqRCxnREFBOEQ7QUFDOUQseURBQXNEO0FBQ3RELHlEQUFzRDtBQUN0RCxtREFBZ0Q7QUFHaEQsdUZBQXdGO0FBRWpGLElBQU0sWUFBWSxHQUFsQixNQUFNLFlBQVk7SUFhckI7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsT0FRVDs7UUFDRyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUM5RSxNQUFNLGNBQWMsR0FBRyxNQUFBLFlBQVksQ0FBQyxTQUFTLG1DQUFJLEVBQUUsQ0FBQSxDQUFDLFNBQVM7UUFDN0QsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsY0FBYyxDQUFBO1FBQ25ELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLG1CQUFtQjtRQUMxQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsQ0FBQyxXQUFXO1FBQ3JDLElBQUksY0FBYyxHQUEwQixJQUFJLENBQUM7UUFFakQsSUFBSSxDQUFDO1lBQ0QsMkJBQTJCO1lBQzNCLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFDM0MsY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFakUsSUFBSSxjQUFjLEVBQUUsQ0FBQztvQkFDakIsU0FBUyxHQUFHLElBQUks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