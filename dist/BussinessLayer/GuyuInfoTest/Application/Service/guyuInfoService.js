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
exports.GuyuInfoService = void 0;
const core_1 = require("@midwayjs/core");
const GuyuTestInfoRepository_1 = require("../../Domain/GuyuTestInfo/GuyuTestInfoRepository");
const GuyuTestInfoModel_1 = require("../../Domain/GuyuTestInfo/GuyuTestInfoModel");
const typeorm_1 = require("typeorm");
let GuyuInfoService = class GuyuInfoService {
    /**
     * 创建新的 Guyu 信息
     * @param data 创建信息的数据
     * @returns 创建成功的实体
     */
    async create(data) {
        try {
            // 创建新的实体
            const guyuInfo = new GuyuTestInfoModel_1.GuyuTestInfoModel({
                name: data.name,
                description: data.description,
                age: data.age,
                phone: data.phone
            });
            // 保存到数据库
            const result = await this.guyuTestInfoRepository.save(guyuInfo);
            this.ctx.logger.info(`创建 GuyuInfo 成功: ${result === null || result === void 0 ? void 0 : result.id}`);
            return result;
        }
        catch (error) {
            this.ctx.logger.error(`创建 GuyuInfo 失败: ${error.message}`, error);
            throw new Error(`创建失败: ${error.message}`);
        }
    }
    /**
     * 根据 ID 查询信息
     * @param id 实体 ID
     * @returns 查询到的实体或 null
     */
    async findById(id) {
        try {
            const result = await this.guyuTestInfoRepository.findById(id);
            if (!result) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的 GuyuInfo`);
                return null;
            }
            this.ctx.logger.info(`查询 GuyuInfo 成功: ${id}`);
            return result;
        }
        catch (error) {
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
    async findAll(page = 1, pageSize = 10) {
        try {
            const repo = (0, typeorm_1.getRepository)(GuyuTestInfoModel_1.GuyuTestInfoModel);
            const [list, total] = await repo.findAndCount({
                where: {
                    status: 'Active' // 只查询未删除的记录
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
        }
        catch (error) {
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
    async update(data) {
        const { id } = data;
        console.log('data is:', data);
        try {
            // 先查询是否存在
            const existInfo = await this.guyuTestInfoRepository.findById(id);
            if (!existInfo) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的 GuyuInfo，无法更新`);
                return null;
            }
            // 更新字段
            if (data.name !== undefined)
                existInfo.name = data.name;
            if (data.description !== undefined)
                existInfo.description = data.description;
            if (data.age !== undefined)
                existInfo.age = data.age;
            if (data.phone !== undefined)
                existInfo.phone = data.phone;
            // 保存更新
            const result = await this.guyuTestInfoRepository.save(existInfo);
            this.ctx.logger.info(`更新 GuyuInfo 成功: ${id}`);
            return result;
        }
        catch (error) {
            this.ctx.logger.error(`更新 GuyuInfo 失败: ${error.message}`, error);
            throw new Error(`更新失败: ${error.message}`);
        }
    }
    /**
     * 软删除（标记为删除状态）
     * @param id 实体 ID
     * @returns 是否删除成功
     */
    async delete(id) {
        try {
            // 先查询是否存在
            const existInfo = await this.guyuTestInfoRepository.findById(id);
            if (!existInfo) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的 GuyuInfo，无法删除`);
                return false;
            }
            // 标记为删除（软删除）
            existInfo.markRemoved();
            // 保存更新
            await this.guyuTestInfoRepository.save(existInfo);
            this.ctx.logger.info(`删除 GuyuInfo 成功: ${id}`);
            return true;
        }
        catch (error) {
            this.ctx.logger.error(`删除 GuyuInfo 失败: ${error.message}`, error);
            throw new Error(`删除失败: ${error.message}`);
        }
    }
    /**
     * 物理删除（真正从数据库中删除）
     * @param id 实体 ID
     * @returns 是否删除成功
     */
    async hardDelete(id) {
        try {
            const repo = (0, typeorm_1.getRepository)(GuyuTestInfoModel_1.GuyuTestInfoModel);
            const result = await repo.delete(id);
            if (result.affected === 0) {
                this.ctx.logger.warn(`未找到 ID 为 ${id} 的 GuyuInfo，无法删除`);
                return false;
            }
            this.ctx.logger.info(`物理删除 GuyuInfo 成功: ${id}`);
            return true;
        }
        catch (error) {
            this.ctx.logger.error(`物理删除 GuyuInfo 失败: ${error.message}`, error);
            throw new Error(`物理删除失败: ${error.message}`);
        }
    }
};
exports.GuyuInfoService = GuyuInfoService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], GuyuInfoService.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Inject)(GuyuTestInfoRepository_1.GUYU_TEST_INFO),
    __metadata("design:type", Object)
], GuyuInfoService.prototype, "guyuTestInfoRepository", void 0);
exports.GuyuInfoService = GuyuInfoService = __decorate([
    (0, core_1.Provide)()
], GuyuInfoService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3V5dUluZm9TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL0J1c3NpbmVzc0xheWVyL0d1eXVJbmZvVGVzdC9BcHBsaWNhdGlvbi9TZXJ2aWNlL2d1eXVJbmZvU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUQ7QUFFakQsNkZBQTJHO0FBQzNHLG1GQUFnRjtBQUNoRixxQ0FBd0M7QUFHakMsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQU94Qjs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUtaO1FBQ0csSUFBSSxDQUFDO1lBQ0QsU0FBUztZQUNULE1BQU0sUUFBUSxHQUFHLElBQUkscUNBQWlCLENBQUM7Z0JBQ25DLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7Z0JBQzdCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztnQkFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDcEIsQ0FBQyxDQUFDO1lBRUgsU0FBUztZQUNULE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sTUFBTyxDQUFDO1FBQ25CLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakUsTUFBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssQ0FBQyxP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