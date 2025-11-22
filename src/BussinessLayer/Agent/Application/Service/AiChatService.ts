import { Provide, Inject } from "@midwayjs/core";
import { Context } from "@midwayjs/web";
import { AiStreamChatInputCommand, AiChatInputCommand } from '@/Helper/Types/chat'
import axios from 'axios'
import { getLines, getMessages } from '@/Helper/ParseSSE/parse'
import { parseSreamResponse } from '@/Helper/ParseSSE/parseResult'
import { EventType } from "@/Helper/Types/parseResult";
export const AI_STUDIO_AI_CHAT = 'AI_STUDIO_AI_CHAT'
@Provide(AI_STUDIO_AI_CHAT)
export class AiChatService {

    @Inject()
    ctx: Context;

    private buildRequestParam(command: AiChatInputCommand): Record<string, any> {
        const requestParams: Record<string, any> = {
            model: command.model,
            messages: command.messages,
            temperature: command.temperature,
            max_tokens: command.max_tokens,
        }
        if (command.timeout) {
            requestParams.timeout = command.timeout;
        }
        if (command.stream) {
            requestParams.stream = command.stream;
        }
        return requestParams;
    }


    //流式调用接口
    async aiChatWithStream(command: AiStreamChatInputCommand): Promise<void> {
        this.ctx.logger.info(
            `开始调用AI服务, model: ${command.model}, messages: ${JSON.stringify(command.messages)}`
        )

        let ak: string = command.ak ?? '';
        const ApiUrl: string = command.ApiUrl ?? '';
        if (!ak) {
            throw new Error('ak is required');
        }
        //构建请求参数
        const requestParams = this.buildRequestParam(command);

        //记录模型开始时间
        // const startTime = Date.now()

        //大模型输出构建
        let response;
        try {
            response = await axios.post(
                ApiUrl,
                requestParams, {
                timeout: command.timeout ?? 5 * 60 * 1000,
                headers: {
                    Authorization: `Bearer ${ak}`
                },
                responseType: 'stream'
            }
            ).catch(err => {
                throw new Error(`失败原因:${err}`)
            })
        } catch (error) {
            throw new Error(`大模型流式调用失败:${error}`)
        }
        const stream = response.data;

        for await (const chunk of stream) {
            const onChunk = getLines(
                getMessages(
                    msg => {
                        const parseResult = parseSreamResponse(msg);
                        command?.onMessage && command?.onMessage(parseResult)
                        console.log('parseResult', parseResult)
                        if (parseResult.eventType === EventType.Complete) {
                           
                            command?.onCompleted && command?.onCompleted(parseResult)
                        }
                        if (parseResult.eventType === EventType.Message) {
                            // command?.onMessage && command?.onMessage(parseResult)
                        }
                        if (parseResult.eventType === EventType.Usage) {
                            command?.onUsage && command?.onUsage(parseResult)
                        }
                    }
                )
            )

            onChunk(chunk)
        }
    }

}