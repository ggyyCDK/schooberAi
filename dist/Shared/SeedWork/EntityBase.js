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
exports.EntityBase = exports.EntityStatus = void 0;
//数据库底层基类
const ruid_1 = require("@sevenryze/ruid");
const typeorm_1 = require("typeorm");
var EntityStatus;
(function (EntityStatus) {
    EntityStatus["ACTIVE"] = "Active";
    EntityStatus["Removed"] = "Removed";
})(EntityStatus || (exports.EntityStatus = EntityStatus = {}));
let EntityBase = class EntityBase {
    constructor() {
        this.id = new ruid_1.Ruid().toString();
        this.status = EntityStatus.ACTIVE;
        this.createDate = new Date();
        this.removedDate = null;
    }
    markActive() {
        this.status = EntityStatus.ACTIVE;
        this.removedDate = null;
    }
    markRemoved() {
        this.status = EntityStatus.Removed;
        this.removedDate = new Date();
    }
    get isActive() {
        return this.status === EntityStatus.ACTIVE;
    }
    get isRemoved() {
        return this.status === EntityStatus.Removed;
    }
};
exports.EntityBase = EntityBase;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment", {
        name: 'db_id',
        type: 'bigint',
        unsigned: true,
        comment: 'The database id of the entity',
    }),
    __metadata("design:type", String)
], EntityBase.prototype, "db_id", void 0);
__decorate([
    (0, typeorm_1.Index)("uk_id", {
        unique: true
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 36,
        nullable: false,
        comment: 'The id of the entity',
    }),
    __metadata("design:type", String)
], EntityBase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'varchar',
        length: 36,
        nullable: false,
        comment: 'The status of the entity',
    }),
    __metadata("design:type", String)
], EntityBase.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({
        name: 'version',
        type: 'int',
        nullable: false,
        comment: 'The version of the entity',
    }),
    __metadata("design:type", Number)
], EntityBase.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'create_date',
        type: 'datetime',
        nullable: false,
    }),
    __metadata("design:type", Date)
], EntityBase.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'update_date',
        type: 'datetime',
        nullable: false,
        comment: 'The updated date of the entity',
    }),
    __metadata("design:type", Date)
], EntityBase.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'removed_date',
        type: 'datetime',
        nullable: true,
        comment: 'The removed date of the entity',
    }),
    __metadata("design:type", Date)
], EntityBase.prototype, "removedDate", void 0);
exports.EntityBase = EntityBase = __decorate([
    (0, typeorm_1.Entity)()
], EntityBase);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50aXR5QmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TaGFyZWQvU2VlZFdvcmsvRW50aXR5QmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxTQUFTO0FBQ1QsMENBQXVDO0FBQ3ZDLHFDQUF5RztBQUV6RyxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDcEIsaUNBQWlCLENBQUE7SUFDakIsbUNBQW1CLENBQUE7QUFDdkIsQ0FBQyxFQUhXLFlBQVksNEJBQVosWUFBWSxRQUd2QjtBQUdNLElBQWUsVUFBVSxHQUF6QixNQUFlLFVBQVU7SUFBekI7UUFxQ0gsT0FBRSxHQUFXLElBQUksV0FBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFTbkMsV0FBTSxHQUFpQixZQUFZLENBQUMsTUFBTSxDQUFDO1FBZ0IzQyxlQUFVLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQWdCOUIsZ0JBQVcsR0FBZ0IsSUFBSSxDQUFDO0lBRXBDLENBQUM7SUE5RWEsVUFBVTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFXLENBQUM7SUFDbkMsQ0FBQztJQUVTLFdBQVc7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFDL0MsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsT0FBTyxDQUFDO0lBQ2hELENBQUM7Q0E4REosQ0FBQTtBQWhGcUIsZ0NBQVU7QUEwQjVCO0lBTkMsSUFBQSxnQ0FBc0IsRUFBQyxXQUFXLEVBQUU7UUFDakMsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLCtCQUErQjtLQUMzQyxDQUFDOzt5Q0FDYTtBQVdmO0lBVEMsSUFBQSxlQUFLLEVBQUMsT0FBTyxFQUFFO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDZixDQUFDO0lBQ0QsSUFBQSxnQkFBTSxFQUFDO1FBQ0osSUFBSSxFQUFFLFNBQVM7UUFDZixNQUFNLEVBQUUsRUFBRTtRQUNWLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLHNCQUFzQjtLQUNsQyxDQUFDOztzQ0FDaUM7QUFTbkM7SUFQQyxJQUFBLGdCQUFNLEVBQUM7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsS0FBSztRQUNmLE9BQU8sRUFBRSwwQkFBMEI7S0FDdEMsQ0FBQzs7MENBQ3lDO0FBUzNDO0lBTkMsSUFBQSx1QkFBYSxFQUFDO1FBQ1gsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVEsRUFBRSxLQUFLO1FBQ2YsT0FBTyxFQUFFLDJCQUEyQjtLQUN2QyxDQUFDOzsyQ0FDZTtBQU9qQjtJQUxDLElBQUEsZ0JBQU0sRUFBQztRQUNKLElBQUksRUFBRSxhQUFhO1FBQ25CLElBQUksRUFBRSxVQUFVO1FBQ2hCLFFBQVEsRUFBRSxLQUFLO0tBQ2xCLENBQUM7OEJBQ1UsSUFBSTs4Q0FBYztBQVE5QjtJQU5DLElBQUEsMEJBQWdCLEVBQUM7UUFDZCxJQUFJLEVBQUUsYUFBYTtRQUNuQixJQUFJLEVBQUUsVUFBVTtRQUNoQixRQUFRLEVBQUUsS0FBSztRQUNmLE9BQU8sRUFBRSxnQ0FBZ0M7S0FDNUMsQ0FBQzs4QkFDVSxJQUFJOzZDQUFDO0FBUWpCO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ0osSUFBSSxFQUFFLGNBQWM7UUFDcEIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsZ0NBQWdDO0tBQzVDLENBQUM7OEJBQ1csSUFBSTsrQ0FBZTtxQkE5RWQsVUFBVTtJQUQvQixJQUFBLGdCQUFNLEdBQUU7R0FDYSxVQUFVLENBZ0YvQiJ9