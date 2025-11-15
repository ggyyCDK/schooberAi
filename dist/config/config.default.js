"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // use for cookie sign key, should change to your own and keep security
    keys: '1762174792249_3022',
    egg: {
        port: 7001,
    },
    cors: {
        origin: '*',
        allowMethods: 'GET,POST,PUT,DELETE,OPTIONS',
        credentials: true,
    },
    security: {
        csrf: false,
        xframe: {
            enable: false
        }
    },
    swagger: {
        title: '代码审查API',
        description: '代码审查API',
        version: '1.0.0',
    },
    httpProxy: {
        enable: true,
        default: {
            target: 'https://idealab.alibaba-inc.com/api/openai/v1/$1',
            ingoreHeaders: {
                origin: true,
                Origin: true
            },
            strategy: {}
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDYix1RUFBdUU7SUFDdkUsSUFBSSxFQUFFLG9CQUFvQjtJQUMxQixHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLEdBQUc7UUFDWCxZQUFZLEVBQUUsNkJBQTZCO1FBRTNDLFdBQVcsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLEtBQUs7UUFDWCxNQUFNLEVBQUU7WUFDTixNQUFNLEVBQUUsS0FBSztTQUNkO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsU0FBUztRQUNoQixXQUFXLEVBQUUsU0FBUztRQUN0QixPQUFPLEVBQUUsT0FBTztLQUNqQjtJQUNELFNBQVMsRUFBRTtRQUNULE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFO1lBQ1AsTUFBTSxFQUFFLGtEQUFrRDtZQUMxRCxhQUFhLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFLElBQUk7YUFDYjtZQUNELFFBQVEsRUFBRSxFQUVUO1NBQ0Y7S0FDRjtDQUNjLENBQUMifQ==