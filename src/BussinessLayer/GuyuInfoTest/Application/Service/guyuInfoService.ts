import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { GUYU_TEST_INFO, IGuyuTestInfoRepository } from '../../Domain/GuyuTestInfo/GuyuTestInfoRepository';
import { GuyuTestInfoModel } from '../../Domain/GuyuTestInfo/GuyuTestInfoModel';
import { getRepository } from 'typeorm';

@Provide()
export class GuyuInfoService {
    @Inject()
    ctx: Context;

    @Inject(GUYU_TEST_INFO)
    guyuTestInfoRepository: IGuyuTestInfoRepository;

    /**
     * 创建新的 Guyu 信息
     * @param data 创建信息的数据
     * @returns 创建成功的实体
     */
    async create(data: {
        name: string;
        description: string;
        age: number;
        phone: string;
    }): Promise<GuyuTestInfoModel> {
        try {
            // 创建新的实体
            const guyuInfo = new GuyuTestInfoModel({
                name: data.name,
                description: data.description,
                age: data.age,
                phone: data.phone
            });

            // 保存到数据库
            const result = await this.guyuTestInfoRepository.save(guyuInfo);

            this.ctx.logger.info(`创建 GuyuInfo 成功: ${result?.id}`);
            return result!;
        } catch (error) {
            this.ctx.logger.error(`创建 GuyuInfo 失败: ${error.message}`, error);
            throw new Error(`创建失败: ${error.message}`);
        }
    }

    /**
     * 根据 ID 查询信息
     * @param id 实体 ID
     * @returns 查询到的实体或 null
     */
    async findById(id: string): Promise<GuyuTestInfoModel | null> {
        try {
            const result = await this.guyuTestInfoRepository.findById(id);

            if (!result) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的 GuyuInfo`);
                return null;
            }

            this.ctx.logger.info(`查询 GuyuInfo 成功: ${id}`);
            return result;
        } catch (error) {
            this.ctx.logger.error(`查询 GuyuInfo 失败: ${error.message}`, error);
            throw new Error(`查询失败: ${error.message}`);
        }
    }

    /**
     * 查询所有信息（分页）
     * @param page 页码（从 1 开始）
     * @param pageSize 每页数量
     * @returns 分页结果
     */
    async findAll(page: number = 1, pageSize: number = 10): Promise<{
        list: GuyuTestInfoModel[];
        total: number;
        page: number;
        pageSize: number;
    }> {
        try {
            const repo = getRepository(GuyuTestInfoModel);

            const [list, total] = await repo.findAndCount({
                where: {
                    status: 'Active'  // 只查询未删除的记录
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
                order: {
                    createDate: 'DESC'
                }
            });

            this.ctx.logger.info(`查询 GuyuInfo 列表成功，共 ${total} 条记录`);

            return {
                list,
                total,
                page,
                pageSize
            };
        } catch (error) {
            this.ctx.logger.error(`查询 GuyuInfo 列表失败: ${error.message}`, error);
            throw new Error(`查询列表失败: ${error.message}`);
        }
    }

    /**
     * 更新信息
     * @param id 实体 ID
     * @param data 更新的数据
     * @returns 更新后的实体
     */
    async update(data: Partial<{
        id: string;
        name: string;
        description: string;
        age: number;
        phone: string;
    }>): Promise<GuyuTestInfoModel | null> {
        const { id } = data;
        console.log('data is:', data)
        try {
            // 先查询是否存在
            const existInfo = await this.guyuTestInfoRepository.findById(id);

            if (!existInfo) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的 GuyuInfo，无法更新`);
                return null;
            }

            // 更新字段
            if (data.name !== undefined) existInfo.name = data.name;
            if (data.description !== undefined) existInfo.description = data.description;
            if (data.age !== undefined) existInfo.age = data.age;
            if (data.phone !== undefined) existInfo.phone = data.phone;

            // 保存更新
            const result = await this.guyuTestInfoRepository.save(existInfo);

            this.ctx.logger.info(`更新 GuyuInfo 成功: ${id}`);
            return result!;
        } catch (error) {
            this.ctx.logger.error(`更新 GuyuInfo 失败: ${error.message}`, error);
            throw new Error(`更新失败: ${error.message}`);
        }
    }

    /**
     * 软删除（标记为删除状态）
     * @param id 实体 ID
     * @returns 是否删除成功
     */
    async delete(id: string): Promise<boolean> {
        try {
            // 先查询是否存在
            const existInfo = await this.guyuTestInfoRepository.findById(id);

            if (!existInfo) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的 GuyuInfo，无法删除`);
                return false;
            }

            // 标记为删除（软删除）
            (existInfo as any).markRemoved();

            // 保存更新
            await this.guyuTestInfoRepository.save(existInfo);

            this.ctx.logger.info(`删除 GuyuInfo 成功: ${id}`);
            return true;
        } catch (error) {
            this.ctx.logger.error(`删除 GuyuInfo 失败: ${error.message}`, error);
            throw new Error(`删除失败: ${error.message}`);
        }
    }

    /**
     * 物理删除（真正从数据库中删除）
     * @param id 实体 ID
     * @returns 是否删除成功
     */
    async hardDelete(id: string): Promise<boolean> {
        try {
            const repo = getRepository(GuyuTestInfoModel);
            const result = await repo.delete(id);

            if (result.affected === 0) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的 GuyuInfo，无法删除`);
                return false;
            }

            this.ctx.logger.info(`物理删除 GuyuInfo 成功: ${id}`);
            return true;
        } catch (error) {
            this.ctx.logger.error(`物理删除 GuyuInfo 失败: ${error.message}`, error);
            throw new Error(`物理删除失败: ${error.message}`);
        }
    }
}

