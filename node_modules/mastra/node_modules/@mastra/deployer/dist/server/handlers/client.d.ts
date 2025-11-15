import type { Context } from 'hono';
export declare function handleClientsRefresh(c: Context): Response;
export declare function handleTriggerClientsRefresh(c: Context): Response & import("hono").TypedResponse<{
    success: true;
    clients: number;
}, import("hono/utils/http-status").ContentfulStatusCode, "json">;
//# sourceMappingURL=client.d.ts.map