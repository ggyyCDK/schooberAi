"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeReviewAgentFactory = void 0;
const agent_1 = require("@mastra/core/agent");
const openai_1 = require("@ai-sdk/openai");
const MODEL_NAME = 'claude37_sonnet';
const PARAMS = {
    name: 'ai助手',
    instructions: '你是一个ai助手，你的任务是帮用户解决各种问题。',
    tools: {}
};
const codeReviewAgentFactory = () => {
    const openai = (0, openai_1.createOpenAI)({
        baseURL: 'https://idealab.alibaba-inc.com/api/openai/v1',
        apiKey: '0df43be045c860540270303846a2605b',
        name: 'idealab',
    });
    return new agent_1.Agent({
        ...PARAMS,
        model: openai(MODEL_NAME),
    });
};
exports.codeReviewAgentFactory = codeReviewAgentFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZVJldmlld0FnZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9CdXNzaW5lc3NMYXllci9Db2RlUmV2aWV3L01hc3RyYS9hZ2VudHMvY29kZVJldmlld0FnZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBMkM7QUFDM0MsMkNBQThDO0FBRTlDLE1BQU0sVUFBVSxHQUFHLGlCQUFpQixDQUFDO0FBRXJDLE1BQU0sTUFBTSxHQUFHO0lBQ1gsSUFBSSxFQUFFLE1BQU07SUFDWixZQUFZLEVBQUUsMEJBQTBCO0lBQ3hDLEtBQUssRUFBRSxFQUFFO0NBQ1osQ0FBQztBQUVLLE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxFQUFFO0lBQ3ZDLE1BQU0sTUFBTSxHQUFHLElBQUEscUJBQVksRUFBQztRQUN4QixPQUFPLEVBQUUsK0NBQStDO1FBQ3hELE1BQU0sRUFBRSxrQ0FBa0M7UUFDMUMsSUFBSSxFQUFFLFNBQVM7S0FDbEIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLGFBQUssQ0FBQztRQUNiLEdBQUcsTUFBTTtRQUNULEtBQUssRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDO0tBQzVCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQVZXLFFBQUEsc0JBQXNCLDBCQVVqQyJ9