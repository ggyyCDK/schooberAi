import { Inject, Controller, Post, Get, Del, Body, Param, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@midwayjs/swagger';
import { GuyuInfoService } from '@/BussinessLayer/GuyuInfoTest/Application/Service/guyuInfoService';


@ApiTags(['guyu测试'])
@Controller('/api/v1/guyutest')
export class GuyuInfoTestController {
    @Inject()
    ctx: Context;

    @Inject()
    guyuInfoService: GuyuInfoService;

    @ApiOperation({ summary: '创建用户信息', description: '创建新的 Guyu 用户信息' })
    @ApiBody({
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
    })
    @ApiResponse({
        status: 200,
        description: '创建成功',
    })
    @Post('/user')
    async createUser(@Body() body: {
        name: string;
        description: string;
        age: number;
        phone: string;
    }) {
        try {
            const result = await this.guyuInfoService.create(body);
            return {
                success: true,
                message: '创建成功',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }
    }

    @ApiOperation({ summary: '根据 ID 查询用户', description: '根据 ID 查询用户信息' })
    @ApiParam({ name: 'id', description: '用户 ID' })
    @ApiResponse({
        status: 200,
        description: '查询成功',
    })
    @Get('/user/:id')
    async getUserById(@Param('id') id: string) {
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
        } catch (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }
    }

    @ApiOperation({ summary: '查询用户列表', description: '分页查询用户信息列表' })
    @ApiQuery({ name: 'page', required: false, description: '页码', example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, description: '每页数量', example: 10 })
    @ApiResponse({
        status: 200,
        description: '查询成功',
    })
    @Get('/users')
    async getUsers(
        @Query('page') page?: number,
        @Query('pageSize') pageSize?: number
    ) {
        try {
            const result = await this.guyuInfoService.findAll(
                page || 1,
                pageSize || 10
            );

            return {
                success: true,
                message: '查询成功',
                data: result
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }
    }
    @ApiBody({
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
    })
    @ApiOperation({ summary: '更新用户信息', description: '根据 ID 更新用户信息' })
    @ApiResponse({
        status: 200,
        description: '更新成功',
    })
    @Post('/user/update')
    async updateUser(@Body() body: {
        id: string;
        name: string;
        description: string;
        age: number;
        phone: string;
    }) {
        console.log('data is controller:', body)
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
        } catch (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }
    }

    @ApiOperation({ summary: '删除用户', description: '软删除用户信息' })
    @ApiParam({ name: 'id', description: '用户 ID' })
    @ApiResponse({
        status: 200,
        description: '删除成功',
    })
    @Del('/user/:id')
    async deleteUser(@Param('id') id: string) {
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
        } catch (error) {
            return {
                success: false,
                message: error.message,
                data: null
            };
        }
    }
}
