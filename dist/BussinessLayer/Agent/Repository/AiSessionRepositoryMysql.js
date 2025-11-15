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
exports.AiSessionRepositoryMysql = void 0;
const core_1 = require("@midwayjs/core");
const typeorm_1 = require("typeorm");
const AiSessionRepository_1 = require("../Domain/Agent/AiSessionRepository");
const AiSession_1 = require("../Domain/Agent/AiSession");
let AiSessionRepositoryMysql = class AiSessionRepositoryMysql {
    constructor() { }
    async findById(id) {
        const repo = (0, typeorm_1.getRepository)(AiSession_1.AiSessionModel);
        const result = await repo.findOne({
            where: {
                id
            }
        });
        return result;
    }
    async save(info) {
        return await (0, typeorm_1.getConnection)().transaction(async (TransactionManager) => {
            const repository = TransactionManager.getRepository(AiSession_1.AiSessionModel);
            return await repository.save(info);
        });
    }
};
exports.AiSessionRepositoryMysql = AiSessionRepositoryMysql;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], AiSessionRepositoryMysql.prototype, "ctx", void 0);
exports.AiSessionRepositoryMysql = AiSessionRepositoryMysql = __decorate([
    (0, core_1.Provide)(AiSessionRepository_1.AI_SESSION),
    __metadata("design:paramtypes", [])
], AiSessionRepositoryMysql);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlTZXNzaW9uUmVwb3NpdG9yeU15c3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0J1c3NpbmVzc0xheWVyL0FnZW50L1JlcG9zaXRvcnkvQWlTZXNzaW9uUmVwb3NpdG9yeU15c3FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFpRDtBQUNqRCxxQ0FBdUQ7QUFDdkQsNkVBQXVGO0FBQ3ZGLHlEQUEyRDtBQUlwRCxJQUFNLHdCQUF3QixHQUE5QixNQUFNLHdCQUF3QjtJQUlqQyxnQkFBZ0IsQ0FBQztJQUVqQixLQUFLLENBQUMsUUFBUSxDQUFDLEVBQVU7UUFDckIsTUFBTSxJQUFJLEdBQUcsSUFBQSx1QkFBYSxFQUFDLDBCQUFjLENBQUMsQ0FBQTtRQUMxQyxNQUFNLE1BQU0sR0FBbUIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzlDLEtBQUssRUFBRTtnQkFDSCxFQUFFO2FBQ0w7U0FDSixDQUFDLENBQUE7UUFDRixPQUFPLE1BQU0sQ0FBQTtJQUNqQixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFvQjtRQUMzQixPQUFPLE1BQU0sSUFBQSx1QkFBYSxHQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQyxrQkFBa0IsRUFBQyxFQUFFO1lBQ2hFLE1BQU0sVUFBVSxHQUFHLGtCQUFrQixDQUFDLGFBQWEsQ0FBQywwQkFBYyxDQUFDLENBQUE7WUFFbkUsT0FBTyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0osQ0FBQTtBQXZCWSw0REFBd0I7QUFFakM7SUFEQyxJQUFBLGFBQU0sR0FBRTs7cURBQ0c7bUNBRkgsd0JBQXdCO0lBRHBDLElBQUEsY0FBTyxFQUFDLGdDQUFVLENBQUM7O0dBQ1Asd0JBQXdCLENBdUJwQyJ9