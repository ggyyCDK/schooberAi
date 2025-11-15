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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZVJldmlld1JlcXVlc3REVE8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQXBpR2F0ZXdheS9jb250cm9sbGVyL1JlcXVlc3REVE8vY29kZVJldmlld1JlcXVlc3REVE8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWdEO0FBRWhEOztHQUVHO0FBQ0gsTUFBYSxZQUFZO0NBa0J4QjtBQWxCRCxvQ0FrQkM7QUFiRztJQUpDLElBQUEscUJBQVcsRUFBQztRQUNULFdBQVcsRUFBRSxRQUFRO1FBQ3JCLE9BQU8sRUFBRSxvQkFBb0I7S0FDaEMsQ0FBQzs7NkNBQ2M7QUFNaEI7SUFKQyxJQUFBLHFCQUFXLEVBQUM7UUFDVCxXQUFXLEVBQUUsTUFBTTtRQUNuQixPQUFPLEVBQUUsS0FBSztLQUNqQixDQUFDOzs4Q0FDZTtBQU1qQjtJQUpDLElBQUEscUJBQVcsRUFBQztRQUNULFdBQVcsRUFBRSxVQUFVO1FBQ3ZCLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUM7OzRDQUNjO0FBR3BCOztHQUVHO0FBQ0gsTUFBYSxhQUFhO0NBTXpCO0FBTkQsc0NBTUM7QUFERztJQUpDLElBQUEscUJBQVcsRUFBQztRQUNULFdBQVcsRUFBRSxRQUFRO1FBQ3JCLElBQUksRUFBRSxZQUFZO0tBQ3JCLENBQUM7OEJBQ1ksWUFBWTttREFBQyJ9