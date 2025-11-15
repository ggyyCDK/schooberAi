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
exports.CodeReviewDto = exports.VariableMaps = void 0;
const swagger_1 = require("@midwayjs/swagger");
/**
 * 变量映射对象
 */
class VariableMaps {
}
exports.VariableMaps = VariableMaps;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '工作目录路径',
        example: '/path/to/workspace'
    }),
    __metadata("design:type", String)
], VariableMaps.prototype, "workDir", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '用户问题',
        example: '你是谁'
    }),
    __metadata("design:type", String)
], VariableMaps.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '是否使用流式响应',
        example: true
    }),
    __metadata("design:type", Boolean)
], VariableMaps.prototype, "stream", void 0);
/**
 * 代码审查请求DTO
 */
class CodeReviewDto {
}
exports.CodeReviewDto = CodeReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '变量映射对象',
        type: VariableMaps
    }),
    __metadata("design:type", VariableMaps)
], CodeReviewDto.prototype, "variableMaps", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZVJldmlld1JlcXVlc3REVE8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQXBpR2F0ZXdheS9haUNvbnRyb2xsZXIvUmVxdWVzdERUTy9jb2RlUmV2aWV3UmVxdWVzdERUTy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0Q7QUFFaEQ7O0dBRUc7QUFDSCxNQUFhLFlBQVk7Q0FrQnhCO0FBbEJELG9DQWtCQztBQWJHO0lBSkMsSUFBQSxxQkFBVyxFQUFDO1FBQ1QsV0FBVyxFQUFFLFFBQVE7UUFDckIsT0FBTyxFQUFFLG9CQUFvQjtLQUNoQyxDQUFDOzs2Q0FDYztBQU1oQjtJQUpDLElBQUEscUJBQVcsRUFBQztRQUNULFdBQVcsRUFBRSxNQUFNO1FBQ25CLE9BQU8sRUFBRSxLQUFLO0tBQ2pCLENBQUM7OzhDQUNlO0FBTWpCO0lBSkMsSUFBQSxxQkFBVyxFQUFDO1FBQ1QsV0FBVyxFQUFFLFVBQVU7UUFDdkIsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQzs7NENBQ2M7QUFHcEI7O0dBRUc7QUFDSCxNQUFhLGFBQWE7Q0FNekI7QUFORCxzQ0FNQztBQURHO0lBSkMsSUFBQSxxQkFBVyxFQUFDO1FBQ1QsV0FBVyxFQUFFLFFBQVE7UUFDckIsSUFBSSxFQUFFLFlBQVk7S0FDckIsQ0FBQzs4QkFDWSxZQUFZO21EQUFDIn0=