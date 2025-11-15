"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSreamResponse = void 0;
const safetyParse_1 = require("../../Helper/format/safetyParse");
const parseResult_1 = require("../../Helper/Types/parseResult");
//完成标记
const COMPLETE_FLAG = '[DONE]';
const errorFinishReasons = ['max_tokens'];
const parseSreamResponse = (response) => {
    var _a, _b;
    const { data } = response;
    //完成parse
    if (data === COMPLETE_FLAG) {
        return {
            eventType: parseResult_1.EventType.Complete,
            content: data
        };
    }
    const dataObj = (0, safetyParse_1.safetyParse)(data);
    const choices = (_a = dataObj.choices) !== null && _a !== void 0 ? _a : [];
    const usage = dataObj.usage;
    if (usage) {
        return {
            eventType: parseResult_1.EventType.Usage,
            content: JSON.stringify(usage)
        };
    }
    if (!Array.isArray(choices) || (choices === null || choices === void 0 ? void 0 : choices.length) < 1) {
        return {
            eventType: parseResult_1.EventType.Null,
            content: data
        };
    }
    const choice = choices[0];
    const content = (_b = choice === null || choice === void 0 ? void 0 : choice.delta) === null || _b === void 0 ? void 0 : _b.content;
    const finishReason = choice === null || choice === void 0 ? void 0 : choice.finish_reason;
    if (errorFinishReasons.includes(finishReason)) {
        return {
            eventType: parseResult_1.EventType.MessageError,
            content: finishReason
        };
    }
    if (content) {
        return {
            eventType: parseResult_1.EventType.Message,
            content: content
        };
    }
    return {
        eventType: parseResult_1.EventType.Null,
        content: data
    };
};
exports.parseSreamResponse = parseSreamResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VSZXN1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvSGVscGVyL1BhcnNlU1NFL3BhcnNlUmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZEQUF5RDtBQUV6RCw0REFBbUU7QUFFbkUsTUFBTTtBQUNOLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQTtBQUU5QixNQUFNLGtCQUFrQixHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFbkMsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLFFBQTRCLEVBQWUsRUFBRTs7SUFDNUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQztJQUMxQixTQUFTO0lBQ1QsSUFBSSxJQUFJLEtBQUssYUFBYSxFQUFFLENBQUM7UUFDekIsT0FBTztZQUNILFNBQVMsRUFBRSx1QkFBUyxDQUFDLFFBQVE7WUFDN0IsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQTtJQUNMLENBQUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFBLHlCQUFXLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsTUFBTSxPQUFPLEdBQUcsTUFBQSxPQUFPLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUM7SUFDdEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtJQUUzQixJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ1IsT0FBTztZQUNILFNBQVMsRUFBRSx1QkFBUyxDQUFDLEtBQUs7WUFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ2pDLENBQUE7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTSxJQUFHLENBQUMsRUFBRSxDQUFDO1FBQ2pELE9BQU87WUFDSCxTQUFTLEVBQUUsdUJBQVMsQ0FBQyxJQUFJO1lBQ3pCLE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUE7SUFDTCxDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLE1BQU0sT0FBTyxHQUFHLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssMENBQUUsT0FBTyxDQUFDO0lBQ3ZDLE1BQU0sWUFBWSxHQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxhQUFhLENBQUM7SUFFM0MsSUFBSSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztRQUM1QyxPQUFPO1lBQ0gsU0FBUyxFQUFFLHVCQUFTLENBQUMsWUFBWTtZQUNqQyxPQUFPLEVBQUUsWUFBWTtTQUN4QixDQUFBO0lBQ0wsQ0FBQztJQUVELElBQUksT0FBTyxFQUFFLENBQUM7UUFDVixPQUFPO1lBQ0gsU0FBUyxFQUFFLHVCQUFTLENBQUMsT0FBTztZQUM1QixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFBO0lBQ0wsQ0FBQztJQUVELE9BQU87UUFDSCxTQUFTLEVBQUUsdUJBQVMsQ0FBQyxJQUFJO1FBQ3pCLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUE7QUFDTCxDQUFDLENBQUE7QUFsRFksUUFBQSxrQkFBa0Isc0JBa0Q5QiJ9