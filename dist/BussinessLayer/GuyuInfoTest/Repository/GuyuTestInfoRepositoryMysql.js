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
exports.GuyuTestInfoRepositoryMysql = void 0;
const core_1 = require("@midwayjs/core");
const typeorm_1 = require("typeorm");
const GuyuTestInfoRepository_1 = require("../Domain/GuyuTestInfo/GuyuTestInfoRepository");
const GuyuTestInfoModel_1 = require("../Domain/GuyuTestInfo/GuyuTestInfoModel");
let GuyuTestInfoRepositoryMysql = class GuyuTestInfoRepositoryMysql {
    constructor() { }
    async findById(id) {
        const repo = (0, typeorm_1.getRepository)(GuyuTestInfoModel_1.GuyuTestInfoModel);
        const result = await repo.findOne({
            where: {
                id
            }
        });
        return result;
    }
    async save(info) {
        return await (0, typeorm_1.getConnection)().transaction(async (TransactionManager) => {
            const repository = TransactionManager.getRepository(GuyuTestInfoModel_1.GuyuTestInfoModel);
            return await repository.save(info);
        });
    }
};
exports.GuyuTestInfoRepositoryMysql = GuyuTestInfoRepositoryMysql;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], GuyuTestInfoRepositoryMysql.prototype, "ctx", void 0);
exports.GuyuTestInfoRepositoryMysql = GuyuTestInfoRepositoryMysql = __decorate([
    (0, core_1.Provide)(GuyuTestInfoRepository_1.GUYU_TEST_INFO),
    __metadata("design:paramtypes", [])
], GuyuTestInfoRepositoryMysql);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3V5dVRlc3RJbmZvUmVwb3NpdG9yeU15c3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0J1c3NpbmVzc0xheWVyL0d1eXVJbmZvVGVzdC9SZXBvc2l0b3J5L0d1eXVUZXN0SW5mb1JlcG9zaXRvcnlNeXNxbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBaUQ7QUFDakQscUNBQXVEO0FBQ3ZELDBGQUF3RztBQUN4RyxnRkFBNkU7QUFLdEUsSUFBTSwyQkFBMkIsR0FBakMsTUFBTSwyQkFBMkI7SUFHcEMsZ0JBQWdCLENBQUM7SUFFakIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFVO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQWEsRUFBQyxxQ0FBaUIsQ0FBQyxDQUFBO1FBQzdDLE1BQU0sTUFBTSxHQUFzQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDakQsS0FBSyxFQUFFO2dCQUNILEVBQUU7YUFDTDtTQUNKLENBQUMsQ0FBQTtRQUNGLE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQXVCO1FBQzlCLE9BQU8sTUFBTSxJQUFBLHVCQUFhLEdBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFDLGtCQUFrQixFQUFDLEVBQUU7WUFDaEUsTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUMsYUFBYSxDQUFDLHFDQUFpQixDQUFDLENBQUE7WUFFdEUsT0FBTyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEMsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0NBQ0osQ0FBQTtBQXZCWSxrRUFBMkI7QUFFcEM7SUFEQyxJQUFBLGFBQU0sR0FBRTs7d0RBQ0c7c0NBRkgsMkJBQTJCO0lBRnZDLElBQUEsY0FBTyxFQUFDLHVDQUFjLENBQUM7O0dBRVgsMkJBQTJCLENBdUJ2QyJ9