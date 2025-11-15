import { Context } from '@midwayjs/web';
import { IGuyuTestInfoRepository } from '../../Domain/GuyuTestInfo/GuyuTestInfoRepository';
import { GuyuTestInfoModel } from '../../Domain/GuyuTestInfo/GuyuTestInfoModel';
export declare class GuyuInfoService {
    ctx: Context;
    guyuTestInfoRepository: IGuyuTestInfoRepository;
    /**
     * 创建新的 Guyu 信息
     * @param data 创建信息的数据
     * @returns 创建成功的实体
     */
    create(data: {
        name: string;
        description: string;
        age: number;
        phone: string;
    }): Promise<GuyuTestInfoModel>;
    /**
     * 根据 ID 查询信息
     * @param id 实体 ID
     * @returns 查询到的实体或 null
     */
    findById(id: string): Promise<GuyuTestInfoModel | null>;
    /**
     * 查询所有信息（分页）
     * @param page 页码（从 1 开始）
     * @param pageSize 每页数量
     * @returns 分页结果
     */
    findAll(page?: number, pageSize?: number): Promise<{
        list: GuyuTestInfoModel[];
        total: number;
        page: number;
        pageSize: number;
    }>;
    /**
     * 更新信息
     * @param id 实体 ID
     * @param data 更新的数据
     * @returns 更新后的实体
     */
    update(data: Partial<{
        id: string;
        name: string;
        description: string;
        age: number;
        phone: string;
    }>): Promise<GuyuTestInfoModel | null>;
    /**
     * 软删除（标记为删除状态）
     * @param id 实体 ID
     * @returns 是否删除成功
     */
    delete(id: string): Promise<boolean>;
    /**
     * 物理删除（真正从数据库中删除）
     * @param id 实体 ID
     * @returns 是否删除成功
     */
    hardDelete(id: string): Promise<boolean>;
}
