import type { EventSourceMessage } from './parse';
import { ParseResult } from '../../Helper/Types/parseResult';
export declare const parseSreamResponse: (response: EventSourceMessage) => ParseResult;
