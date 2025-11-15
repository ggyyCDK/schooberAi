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
exports.GuyuTestInfoModel = void 0;
const typeorm_1 = require("typeorm");
const AggregateRoots_1 = require("../../../../Shared/SeedWork/AggregateRoots");
let GuyuTestInfoModel = class GuyuTestInfoModel extends AggregateRoots_1.AggregateRoot {
    constructor(options) {
        super();
        if (options) {
            this.name = options.name;
            this.description = options.description;
            this.age = options.age;
            this.phone = options.phone;
        }
    }
};
exports.GuyuTestInfoModel = GuyuTestInfoModel;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], GuyuTestInfoModel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], GuyuTestInfoModel.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], GuyuTestInfoModel.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], GuyuTestInfoModel.prototype, "phone", void 0);
exports.GuyuTestInfoModel = GuyuTestInfoModel = __decorate([
    (0, typeorm_1.Entity)(`guyu_info`),
    __metadata("design:paramtypes", [Object])
], GuyuTestInfoModel);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3V5dVRlc3RJbmZvTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQnVzc2luZXNzTGF5ZXIvR3V5dUluZm9UZXN0L0RvbWFpbi9HdXl1VGVzdEluZm8vR3V5dVRlc3RJbmZvTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXlDO0FBQ3pDLHFFQUFpRTtBQUcxRCxJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFrQixTQUFRLDhCQUFhO0lBRWhELFlBQVksT0FLWDtRQUNHLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMvQixDQUFDO0lBQ0wsQ0FBQztDQTZCSixDQUFBO0FBNUNZLDhDQUFpQjtBQXNCMUI7SUFMQyxJQUFBLGdCQUFNLEVBQUM7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE1BQU0sRUFBRSxHQUFHO1FBQ1gsUUFBUSxFQUFFLEtBQUs7S0FDbEIsQ0FBQzs7K0NBQ1k7QUFPZDtJQUxDLElBQUEsZ0JBQU0sRUFBQztRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsTUFBTSxFQUFFLEdBQUc7UUFDWCxRQUFRLEVBQUUsS0FBSztLQUNsQixDQUFDOztzREFDbUI7QUFNckI7SUFKQyxJQUFBLGdCQUFNLEVBQUM7UUFDSixJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVEsRUFBRSxLQUFLO0tBQ2xCLENBQUM7OzhDQUNXO0FBT2I7SUFMQyxJQUFBLGdCQUFNLEVBQUM7UUFDSixJQUFJLEVBQUUsU0FBUztRQUNmLE1BQU0sRUFBRSxHQUFHO1FBQ1gsUUFBUSxFQUFFLEtBQUs7S0FDbEIsQ0FBQzs7Z0RBQ2E7NEJBMUNOLGlCQUFpQjtJQUQ3QixJQUFBLGdCQUFNLEVBQUMsV0FBVyxDQUFDOztHQUNQLGlCQUFpQixDQTRDN0IifQ==