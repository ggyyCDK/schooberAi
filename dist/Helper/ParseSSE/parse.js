"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBytes = getBytes;
exports.getLines = getLines;
exports.getMessages = getMessages;
/**
 * Converts a ReadableStream into a callback pattern.
 * @param stream The input ReadableStream.
 * @param onChunk A function that will be called on each new byte chunk in the stream.
 * @returns {Promise<void>} A promise that will be resolved when the stream closes.
 */
async function getBytes(stream, onChunk) {
    const reader = stream.getReader();
    let result;
    while (!(result = await reader.read()).done) {
        onChunk(result.value);
    }
}
/**
 * Parses arbitary byte chunks into EventSource line buffers.
 * Each line should be of the format "field: value" and ends with \r, \n, or \r\n.
 * @param onLine A function that will be called on each new EventSource line.
 * @returns A function that should be called for each incoming byte chunk.
 */
function getLines(onLine) {
    let buffer;
    let position; // current read position
    let fieldLength; // length of the `field` portion of the line
    let discardTrailingNewline = false;
    // return a function that can process each incoming byte chunk:
    return function onChunk(arr) {
        if (buffer === undefined) {
            buffer = arr;
            position = 0;
            fieldLength = -1;
        }
        else {
            // we're still parsing the old line. Append the new bytes into buffer:
            buffer = concat(buffer, arr);
        }
        const bufLength = buffer.length;
        let lineStart = 0; // index where the current line starts
        while (position < bufLength) {
            if (discardTrailingNewline) {
                if (buffer[position] === 10 /* ControlChars.NewLine */) {
                    lineStart = ++position; // skip to next char
                }
                discardTrailingNewline = false;
            }
            // start looking forward till the end of line:
            let lineEnd = -1; // index of the \r or \n char
            for (; position < bufLength && lineEnd === -1; ++position) {
                switch (buffer[position]) {
                    case 58 /* ControlChars.Colon */:
                        if (fieldLength === -1) { // first colon in line
                            fieldLength = position - lineStart;
                        }
                        break;
                    // @ts-ignore:7029 \r case below should fallthrough to \n:
                    case 13 /* ControlChars.CarriageReturn */:
                        discardTrailingNewline = true;
                    case 10 /* ControlChars.NewLine */:
                        lineEnd = position;
                        break;
                }
            }
            if (lineEnd === -1) {
                // We reached the end of the buffer but the line hasn't ended.
                // Wait for the next arr and then continue parsing:
                break;
            }
            // we've reached the line end, send it out:
            onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
            lineStart = position; // we're now on the next line
            fieldLength = -1;
        }
        if (lineStart === bufLength) {
            buffer = undefined; // we've finished reading it
        }
        else if (lineStart !== 0) {
            // Create a new view into buffer beginning at lineStart so we don't
            // need to copy over the previous lines when we get the new arr:
            buffer = buffer.subarray(lineStart);
            position -= lineStart;
        }
    };
}
/**
 * Parses line buffers into EventSourceMessages.
 * @param onId A function that will be called on each `id` field.
 * @param onRetry A function that will be called on each `retry` field.
 * @param onMessage A function that will be called on each message.
 * @returns A function that should be called for each incoming line buffer.
 */
function getMessages(onMessage, onId, onRetry) {
    let message = newMessage();
    const decoder = new TextDecoder();
    // return a function that can process each incoming line buffer:
    return function onLine(line, fieldLength) {
        if (line.length === 0) {
            // empty line denotes end of message. Trigger the callback and start a new message:
            onMessage === null || onMessage === void 0 ? void 0 : onMessage(message);
            message = newMessage();
        }
        else if (fieldLength > 0) { // exclude comments and lines with no values
            // line is of format "<field>:<value>" or "<field>: <value>"
            // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
            const field = decoder.decode(line.subarray(0, fieldLength));
            const valueOffset = fieldLength + (line[fieldLength + 1] === 32 /* ControlChars.Space */ ? 2 : 1);
            const value = decoder.decode(line.subarray(valueOffset));
            switch (field) {
                case 'data':
                    // if this message already has data, append the new value to the old.
                    // otherwise, just set to the new value:
                    message.data = message.data
                        ? message.data + '\n' + value
                        : value; // otherwise, 
                    break;
                case 'event':
                    message.event = value;
                    break;
                case 'id':
                    onId(message.id = value);
                    break;
                case 'retry':
                    const retry = parseInt(value, 10);
                    if (!isNaN(retry)) { // per spec, ignore non-integers
                        onRetry(message.retry = retry);
                    }
                    break;
            }
        }
    };
}
function concat(a, b) {
    const res = new Uint8Array(a.length + b.length);
    res.set(a);
    res.set(b, a.length);
    return res;
}
function newMessage() {
    // data, event, and id must be initialized to empty strings:
    // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
    // retry should be initialized to undefined so we return a consistent shape
    // to the js engine all the time: https://mathiasbynens.be/notes/shapes-ics#takeaways
    return {
        data: '',
        event: '',
        id: '',
        retry: undefined,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvSGVscGVyL1BhcnNlU1NFL3BhcnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBcUJBLDRCQU1DO0FBZUQsNEJBbUVDO0FBU0Qsa0NBNkNDO0FBcEpEOzs7OztHQUtHO0FBQ0ksS0FBSyxVQUFVLFFBQVEsQ0FBQyxNQUFrQyxFQUFFLE9BQWtDO0lBQ2pHLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsQyxJQUFJLE1BQU0sQ0FBQztJQUNYLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztBQUNMLENBQUM7QUFTRDs7Ozs7R0FLRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxNQUF1RDtJQUM1RSxJQUFJLE1BQThCLENBQUM7SUFDbkMsSUFBSSxRQUFnQixDQUFDLENBQUMsd0JBQXdCO0lBQzlDLElBQUksV0FBbUIsQ0FBQyxDQUFDLDRDQUE0QztJQUNyRSxJQUFJLHNCQUFzQixHQUFHLEtBQUssQ0FBQztJQUVuQywrREFBK0Q7SUFDL0QsT0FBTyxTQUFTLE9BQU8sQ0FBQyxHQUFlO1FBQ25DLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDYixRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7YUFBTSxDQUFDO1lBQ0osc0VBQXNFO1lBQ3RFLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksU0FB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