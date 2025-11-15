import { z } from 'zod';
export declare const weatherTool: import("@mastra/core/tools").Tool<z.ZodObject<{
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
}, {
    location: string;
}>, z.ZodObject<{
    temperature: z.ZodNumber;
    feelsLike: z.ZodNumber;
    humidity: z.ZodNumber;
    windSpeed: z.ZodNumber;
    windGust: z.ZodNumber;
    conditions: z.ZodString;
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windGust: number;
    conditions: string;
}, {
    location: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windGust: number;
    conditions: string;
}>, import("@mastra/core").ToolExecutionContext<z.ZodObject<{
    location: z.ZodString;
}, "strip", z.ZodTypeAny, {
    location: string;
}, {
    location: string;
}>>> & {
    inputSchema: z.ZodObject<{
        location: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        location: string;
    }, {
        location: string;
    }>;
    outputSchema: z.ZodObject<{
        temperature: z.ZodNumber;
        feelsLike: z.ZodNumber;
        humidity: z.ZodNumber;
        windSpeed: z.ZodNumber;
        windGust: z.ZodNumber;
        conditions: z.ZodString;
        location: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        location: string;
        temperature: number;
        feelsLike: number;
        humidity: number;
        windSpeed: number;
        windGust: number;
        conditions: string;
    }, {
        location: string;
        temperature: number;
        feelsLike: number;
        humidity: number;
        windSpeed: number;
        windGust: number;
        conditions: string;
    }>;
    execute: (context: import("@mastra/core").ToolExecutionContext<z.ZodObject<{
        location: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        location: string;
    }, {
        location: string;
    }>>) => Promise<any>;
};
//# sourceMappingURL=tools.d.ts.map