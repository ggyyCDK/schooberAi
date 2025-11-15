"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRunRequestDTO = void 0;
const swagger_1 = require("@midwayjs/swagger");
const class_validator_1 = require("class-validator");
/**
 * 变量映射对象
 */
class AgentRunRequestDTO {
}
exports.AgentRunRequestDTO = AgentRunRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '会话ID',
        example: 'GUYUTEST1',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AgentRunRequestDTO.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '使用者工号',
        example: 'worker001',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AgentRunRequestDTO.prototype, "workerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '变量映射',
        example: {
            llmConfig: {
                workDir: '/',
                model: 'claude_sonnet4',
                ak: '',
                ApiUrl: ''
            }
        },
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], AgentRunRequestDTO.prototype, "variableMaps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '用户问题',
        example: [
            {
                role: 'user',
                content: '你好，请介绍一下你自己'
            }
        ],
    }),
    __metadata("design:type", Array)
], AgentRunRequestDTO.prototype, "question", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdlbnRSdW5SZXF1ZXN0RFRPLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0FwaUdhdGV3YXkvYWlDb250cm9sbGVyL1JlcXVlc3REVE8vQWdlbnRSdW5SZXF1ZXN0RFRPLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLCtDQUFnRDtBQUNoRCxxREFBZ0U7QUFDaEU7O0dBRUc7QUFDSCxNQUFhLGtCQUFrQjtDQTJDOUI7QUEzQ0QsZ0RBMkNDO0FBcENHO0lBTkMsSUFBQSxxQkFBVyxFQUFDO1FBQ1QsV0FBVyxFQUFFLE1BQU07UUFDbkIsT0FBTyxFQUFFLFdBQVc7S0FDdkIsQ0FBQztJQUNELElBQUEsMEJBQVEsR0FBRTtJQUNWLElBQUEsNEJBQVUsR0FBRTs7cURBQ007QUFTbkI7SUFOQyxJQUFBLHFCQUFXLEVBQUM7UUFDVCxXQUFXLEVBQUUsT0FBTztRQUNwQixPQUFPLEVBQUUsV0FBVztLQUN2QixDQUFDO0lBQ0QsSUFBQSwwQkFBUSxHQUFFO0lBQ1YsSUFBQSw0QkFBVSxHQUFFOztvREFDSztBQWVsQjtJQWJDLElBQUEscUJBQVcsRUFBQztRQUNULFdBQVcsRUFBRSxNQUFNO1FBQ25CLE9BQU8sRUFBRTtZQUNMLFNBQVMsRUFBRTtnQkFDUCxPQUFPLEVBQUUsR0FBRztnQkFDWixLQUFLLEVBQUUsZ0JBQWdCO2dCQUN2QixFQUFFLEVBQUUsRUFBRTtnQkFDTixNQUFNLEVBQUUsRUFBRTthQUNiO1NBQ0o7S0FDSixDQUFDO0lBQ0QsSUFBQSwwQkFBUSxHQUFFO0lBQ1YsSUFBQSwwQkFBUSxHQUFFOzt3REFDMkI7QUFXdEM7SUFUQyxJQUFBLHFCQUFXLEVBQUM7UUFDVCxXQUFXLEVBQUUsTUFBTTtRQUNuQixPQUFPLEVBQUU7WUFDTDtnQkFDSSxJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsYUFBYTthQUN6QjtTQUNKO0tBQ0osQ0FBQzs7b0RBQ2tCIn0=