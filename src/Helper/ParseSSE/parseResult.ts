import { safetyParse } from '@/Helper/format/safetyParse'
import type { EventSourceMessage } from './parse'
import { EventType, ParseResult } from '@/Helper/Types/parseResult'

//完成标记
const COMPLETE_FLAG = '[DONE]'

const errorFinishReasons = ['max_tokens'];

export const parseSreamResponse = (response: EventSourceMessage): ParseResult => {
    const { data } = response;
    //完成parse
    if (data === COMPLETE_FLAG) {
        return {
            eventType: EventType.Complete,
            content: data
        }
    }

    const dataObj = safetyParse(data);
    const choices = dataObj.choices ?? [];
    const usage = dataObj.usage

    if (usage) {
        return {
            eventType: EventType.Usage,
            content: JSON.stringify(usage)
        }
    }

    if (!Array.isArray(choices) || choices?.length < 1) {
        return {
            eventType: EventType.Null,
            content: data
        }
    }

    const choice = choices[0];
    const content = choice?.delta?.content;
    const finishReason = choice?.finish_reason;

    if (errorFinishReasons.includes(finishReason)) {
        return {
            eventType: EventType.MessageError,
            content: finishReason
        }
    }

    if (content) {
        return {
            eventType: EventType.Message,
            content: content
        }
    }

    return {
        eventType: EventType.Null,
        content: data
    }
}