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
exports.AiSessionModel = void 0;
const typeorm_1 = require("typeorm");
const AggregateRoots_1 = require("../../../../Shared/SeedWork/AggregateRoots");
let AiSessionModel = class AiSessionModel extends AggregateRoots_1.AggregateRoot {
    constructor(options) {
        super();
        if (options) {
            if (options.sessionId)
                this.id = options.sessionId;
            this.workerId = options.workerId;
            if (options.businessType)
                this.businessType = options.businessType;
            if (options.name)
                this.name = options.name;
            if (options.ext)
                this.ext = options.ext;
        }
    }
};
exports.AiSessionModel = AiSessionModel;
__decorate([
    (0, typeorm_1.Column)({
        name: 'worker_id',
        type: 'varchar',
        length: 255,
        nullable: false,
        comment: '工作者ID'
    }),
    __metadata("design:type", String)
], AiSessionModel.prototype, "workerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_type',
        type: 'varchar',
        length: 100,
        nullable: true,
        comment: '业务类型'
    }),
    __metadata("design:type", String)
], AiSessionModel.prototype, "businessType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: '会话名称'
    }),
    __metadata("design:type", String)
], AiSessionModel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ext',
        type: 'json',
        nullable: true,
        comment: '扩展字段'
    }),
    __metadata("design:type", Object)
], AiSessionModel.prototype, "ext", void 0);
exports.AiSessionModel = AiSessionModel = __decorate([
    (0, typeorm_1.Entity)(`ai_session`),
    __metadata("design:paramtypes", [Object])
], AiSessionModel);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlTZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL0J1c3NpbmVzc0xheWVyL0FnZW50L0RvbWFpbi9BZ2VudC9BaVNlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXlDO0FBQ3pDLHFFQUFpRTtBQUcxRCxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFlLFNBQVEsOEJBQWE7SUFFN0MsWUFBWSxPQU1YO1FBQ0csS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxPQUFPLENBQUMsU0FBUztnQkFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDbkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ2pDLElBQUksT0FBTyxDQUFDLFlBQVk7Z0JBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1lBQ25FLElBQUksT0FBTyxDQUFDLElBQUk7Z0JBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQzNDLElBQUksT0FBTyxDQUFDLEdBQUc7Z0JBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQzVDLENBQUM7SUFDTCxDQUFDO0NBc0NKLENBQUE7QUF2RFksd0NBQWM7QUEyQnZCO0lBUEMsSUFBQSxnQkFBTSxFQUFDO1FBQ0osSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLFNBQVM7UUFDZixNQUFNLEVBQUUsR0FBRztRQUNYLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLE9BQU87S0FDbkIsQ0FBQzs7Z0RBQ2U7QUFTakI7SUFQQyxJQUFBLGdCQUFNLEVBQUM7UUFDSixJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUUsU0FBUztRQUNmLE1BQU0sRUFBRSxHQUFHO1FBQ1gsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOztvREFDb0I7QUFTdEI7SUFQQyxJQUFBLGdCQUFNLEVBQUM7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTSxFQUFFLEdBQUc7UUFDWCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxNQUFNO0tBQ2xCLENBQUM7OzRDQUNZO0FBUWQ7SUFOQyxJQUFBLGdCQUFNLEVBQUM7UUFDSixJQUFJLEVBQUUsS0FBSztRQUNYLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsTUFBTTtLQUNsQixDQUFDOzsyQ0FDUTt5QkFyREQsY0FBYztJQUQxQixJQUFBLGdCQUFNLEVBQUMsWUFBWSxDQUFDOztHQUNSLGNBQWMsQ0F1RDFCIn0=