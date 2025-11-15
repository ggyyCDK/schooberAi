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
exports.AiMessageRepositoryMysql = void 0;
const core_1 = require("@midwayjs/core");
const typeorm_1 = require("typeorm");
const AiMessageRepository_1 = require("../Domain/Agent/AiMessageRepository");
const AiMessage_1 = require("../Domain/Agent/AiMessage");
let AiMessageRepositoryMysql = class AiMessageRepositoryMysql {
    async findById(id) {
        const repo = (0, typeorm_1.getRepository)(AiMessage_1.AiMessageModel);
        const result = await repo.findOne({
            where: {
                id
            }
        });
        return result !== null && result !== void 0 ? result : null;
    }
    async listBySessionId(sessionId) {
        const repo = (0, typeorm_1.getRepository)(AiMessage_1.AiMessageModel);
        return await repo.find({
            where: {
                sessionId
            },
            order: {
                createDate: "ASC"
            }
        });
    }
    async deleteMessageBySessionId(sessionId) {
        var _a;
        const repo = (0, typeorm_1.getRepository)(AiMessage_1.AiMessageModel);
        const result = await repo.delete({ sessionId });
        return ((_a = result.affected) !== null && _a !== void 0 ? _a : 0) > 0;
    }
    async save(message) {
        return await (0, typeorm_1.getConnection)().transaction(async (transactionManager) => {
            const repository = transactionManager.getRepository(AiMessage_1.AiMessageModel);
            return await repository.save(message);
        });
    }
};
exports.AiMessageRepositoryMysql = AiMessageRepositoryMysql;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], AiMessageRepositoryMysql.prototype, "ctx", void 0);
exports.AiMessageRepositoryMysql = AiMessageRepositoryMysql = __decorate([
    (0, core_1.Provide)(AiMessageRepository_1.AI_MESSAGE)
], AiMessageRepositoryMysql);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlNZXNzYWdlUmVwb3NpdG9yeU15c3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0J1c3NpbmVzc0xheWVyL0FnZW50L1JlcG9zaXRvcnkvQWlNZXNzYWdlUmVwb3NpdG9yeU15c3FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFpRDtBQUVqRCxxQ0FBdUQ7QUFDdkQsNkVBQXVGO0FBQ3ZGLHlEQUEyRDtBQUdwRCxJQUFNLHdCQUF3QixHQUE5QixNQUFNLHdCQUF3QjtJQUlqQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQVU7UUFDckIsTUFBTSxJQUFJLEdBQUcsSUFBQSx1QkFBYSxFQUFDLDBCQUFjLENBQUMsQ0FBQztRQUMzQyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDOUIsS0FBSyxFQUFFO2dCQUNILEVBQUU7YUFDTDtTQUNKLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQWlCO1FBQ25DLE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQWEsRUFBQywwQkFBYyxDQUFDLENBQUM7UUFDM0MsT0FBTyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbkIsS0FBSyxFQUFFO2dCQUNILFNBQVM7YUFDWjtZQUNELEtBQUssRUFBRTtnQkFDSCxVQUFVLEVBQUUsS0FBSzthQUNwQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxLQUFLLENBQUMsd0JBQXdCLENBQUMsU0FBaUI7O1FBQzVDLE1BQU0sSUFBSSxHQUFHLElBQUEsdUJBQWEsRUFBQywwQkFBYyxDQUFDLENBQUM7UUFDM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNoRCxPQUFPLENBQUMsTUFBQSxNQUFNLENBQUMsUUFBUSxtQ0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBdUI7UUFDOUIsT0FBTyxNQUFNLElBQUEsdUJBQWEsR0FBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUMsa0JBQWtCLEVBQUMsRUFBRTtZQUNoRSxNQUFNLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsMEJBQWMsQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sTUFBTSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUE7QUF0Q1ksNERBQXdCO0FBRWpDO0lBREMsSUFBQSxhQUFNLEdBQUU7O3FEQUNJO21DQUZKLHdCQUF3QjtJQURwQyxJQUFBLGNBQU8sRUFBQyxnQ0FBVSxDQUFDO0dBQ1Asd0JBQXdCLENBc0NwQyJ9