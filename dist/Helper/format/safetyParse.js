"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safetyParse = safetyParse;
function safetyParse(content) {
    if (!content)
        return {};
    let result = {};
    if (typeof content === 'string') {
        try {
            result = JSON.parse(content);
        }
        catch (error) {
            result = content;
        }
    }
    else {
        result = content;
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmZXR5UGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvSGVscGVyL2Zvcm1hdC9zYWZldHlQYXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQWFDO0FBYkQsU0FBZ0IsV0FBVyxDQUFDLE9BQXFDO0lBQzdELElBQUksQ0FBQyxPQUFPO1FBQUUsT0FBTyxFQUFFLENBQUE7SUFDdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDaEMsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixNQUFNLEdBQUcsT0FBTyxDQUFBO1FBQ3BCLENBQUM7SUFDTCxDQUFDO1NBQU0sQ0FBQztRQUNKLE1BQU0sR0FBRyxPQUFPLENBQUE7SUFDcEIsQ0FBQztJQUNELE9BQU8sTUFBTSxDQUFBO0FBQ2pCLENBQUMifQ==