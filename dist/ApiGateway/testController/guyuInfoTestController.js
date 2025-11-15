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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuyuInfoTestController = void 0;
const core_1 = require("@midwayjs/core");
const swagger_1 = require("@midwayjs/swagger");
const guyuInfoService_1 = require("../../BussinessLayer/GuyuInfoTest/Application/Service/guyuInfoService");
let GuyuInfoTestController = class GuyuInfoTestController {
    async createUser(body) {
        try {
            const result = await this.guyuInfoService.create(body);
            return {
                success: true,
                message: '创建成功',
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }
    }
    async getUserById(id) {
        try {
            const result = await this.guyuInfoService.findById(id);
            if (!result) {
                return {
                    success: false,
                    message: '用户不存在',
                    data: null
                };
            }
            return {
                success: true,
                message: '查询成功',
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }
    }
    async getUsers(page, pageSize) {
        try {
            const result = await this.guyuInfoService.findAll(page || 1, pageSize || 10);
            return {
                success: true,
                message: '查询成功',
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }
    }
    async updateUser(body) {
        console.log('data is controller:', body);
        try {
            const result = await this.guyuInfoService.update(body);
            if (!result) {
                return {
                    success: false,
                    message: '用户不存在',
                    data: null
                };
            }
            return {
                success: true,
                message: '更新成功',
                data: result
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }
    }
    async deleteUser(id) {
        try {
            const result = await this.guyuInfoService.hardDelete(id);
            if (!result) {
                return {
                    success: false,
                    message: '用户不存在',
                    data: null
                };
            }
            return {
                success: true,
                message: '删除成功',
                data: null
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }
    }
};
exports.GuyuInfoTestController = GuyuInfoTestController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], GuyuInfoTestController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", guyuInfoService_1.GuyuInfoService)
], GuyuInfoTestController.prototype, "guyuInfoService", void 0);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '创建用户信息', description: '创建新的 Guyu 用户信息' }),
    (0, swagger_1.ApiBody)({
        description: '用户信息',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: '姓名' },
                description: { type: 'string', description: '描述' },
                age: { type: 'number', description: '年龄' },
                phone: { type: 'string', description: '电话' }
            },
            required: ['name', 'description', 'age', 'phone']
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '创建成功',
    }),
    (0, core_1.Post)('/user'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GuyuInfoTestController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '根据 ID 查询用户', description: '根据 ID 查询用户信息' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '用户 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '查询成功',
    }),
    (0, core_1.Get)('/user/:id'),
    __param(0, (0, core_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuyuInfoTestController.prototype, "getUserById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '查询用户列表', description: '分页查询用户信息列表' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: '页码', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, description: '每页数量', example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '查询成功',
    }),
    (0, core_1.Get)('/users'),
    __param(0, (0, core_1.Query)('page')),
    __param(1, (0, core_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GuyuInfoTestController.prototype, "getUsers", null);
__decorate([
    (0, swagger_1.ApiBody)({
        description: '用户信息',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', description: '用户 ID' },
                name: { type: 'string', description: '姓名' },
                description: { type: 'string', description: '描述' },
                age: { type: 'number', description: '年龄' },
                phone: { type: 'string', description: '电话' }
            },
            required: ['name', 'description', 'age', 'phone']
        }
    }),
    (0, swagger_1.ApiOperation)({ summary: '更新用户信息', description: '根据 ID 更新用户信息' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '更新成功',
    }),
    (0, core_1.Post)('/user/update'),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GuyuInfoTestController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除用户', description: '软删除用户信息' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '用户 ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '删除成功',
    }),
    (0, core_1.Del)('/user/:id'),
    __param(0, (0, core_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GuyuInfoTestController.prototype, "deleteUser", null);
exports.GuyuInfoTestController = GuyuInfoTestController = __decorate([
    (0, swagger_1.ApiTags)(['guyu测试']),
    (0, core_1.Controller)('/api/v1/guyutest')
], GuyuInfoTestController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3V5dUluZm9UZXN0Q29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BcGlHYXRld2F5L3Rlc3RDb250cm9sbGVyL2d1eXVJbmZvVGVzdENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXdGO0FBRXhGLCtDQUFvRztBQUNwRyx1R0FBb0c7QUFLN0YsSUFBTSxzQkFBc0IsR0FBNUIsTUFBTSxzQkFBc0I7SUEwQnpCLEFBQU4sS0FBSyxDQUFDLFVBQVUsQ0FBUyxJQUt4QjtRQUNHLElBQUksQ0FBQztZQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsT0FBTztnQkFDSCxPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsTUFBTTtnQkFDZixJQUFJLEVBQUUsTUFBTTthQUNmLENBQUM7UUFDTixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU87Z0JBQ0gsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixJQUFJLEVBQUUsSUFBSTthQUNiLENBQUM7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQVNLLEFBQU4sS0FBSyxDQUFDLFdBQVcsQ0FBYyxFQUFVO1FBQ3JDLElBQUksQ0FBQztZQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFdkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNWLE9BQU87b0JBQ0gsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLElBQUksRUFBRSxJQUFJO2lCQUNiLENBQUM7WUFDTixDQUFDO1lBRUQsT0FBTztnQkFDSCxPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFP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