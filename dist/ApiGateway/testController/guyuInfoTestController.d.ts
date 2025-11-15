import { Context } from '@midwayjs/web';
import { GuyuInfoService } from '../../BussinessLayer/GuyuInfoTest/Application/Service/guyuInfoService';
export declare class GuyuInfoTestController {
    ctx: Context;
    guyuInfoService: GuyuInfoService;
    createUser(body: {
        name: string;
        description: string;
        age: number;
        phone: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: import("../../BussinessLayer/GuyuInfoTest/Domain/GuyuTestInfo/GuyuTestInfoModel").GuyuTestInfoModel;
    } | {
        success: boolean;
        message: any;
        data: any;
    }>;
    getUserById(id: string): Promise<{
        success: boolean;
        message: string;
        data: import("../../BussinessLayer/GuyuInfoTest/Domain/GuyuTestInfo/GuyuTestInfoModel").GuyuTestInfoModel;
    } | {
        success: boolean;
        message: any;
        data: any;
    }>;
    getUsers(page?: number, pageSize?: number): Promise<{
        success: boolean;
        message: string;
        data: {
            list: import("../../BussinessLayer/GuyuInfoTest/Domain/GuyuTestInfo/GuyuTestInfoModel").GuyuTestInfoModel[];
            total: number;
            page: number;
            pageSize: number;
        };
    } | {
        success: boolean;
        message: any;
        data: any;
    }>;
    updateUser(body: {
        id: string;
        name: string;
        description: string;
        age: number;
        phone: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: import("../../BussinessLayer/GuyuInfoTest/Domain/GuyuTestInfo/GuyuTestInfoModel").GuyuTestInfoModel;
    } | {
        success: boolean;
        message: any;
        data: any;
    }>;
    deleteUser(id: string): Promise<{
        success: boolean;
        message: any;
        data: any;
    }>;
}
