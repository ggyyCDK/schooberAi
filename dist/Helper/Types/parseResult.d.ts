export declare enum EventType {
    Message = "message",
    Complete = "complete",
    MessageError = "error",
    Usage = "usage",
    Null = "null"
}
export interface ParseResult {
    eventType: EventType;
    content: string;
}
