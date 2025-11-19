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
exports.MainConfiguration = void 0;
const core_1 = require("@midwayjs/core");
const egg = require("@midwayjs/web");
const path_1 = require("path");
const crossDomain = require("@midwayjs/cross-domain");
const swagger = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
let MainConfiguration = class MainConfiguration {
    async onReady() {
        this.app.connection = await initConnection(this.app);
    }
};
exports.MainConfiguration = MainConfiguration;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], MainConfiguration.prototype, "app", void 0);
exports.MainConfiguration = MainConfiguration = __decorate([
    (0, core_1.Configuration)({
        imports: [
            egg,
            crossDomain,
            swagger
        ],
        importConfigs: [(0, path_1.join)(__dirname, './config')],
    })
], MainConfiguration);
const initConnection = async (app) => {
    return await (0, typeorm_1.createConnection)({
        type: 'mysql',
        host: 'rm-bp1854x0z3445ng13zo.mysql.rds.aliyuncs.com',
        port: 3306,
        username: 'dms_user_47051c5',
        password: 'woshiGY3011',
        database: 'ai_mutil_message',
        charset: 'utf8mb4',
        driver: require('mysql2'),
        // connectorPackage:'mysql2',
        entities: [
            __dirname + '/BussinessLayer/**/Domain/**/*.ts',
            __dirname + '/BussinessLayer/**/Domain/**/*.js'
        ]
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF3RTtBQUN4RSxxQ0FBcUM7QUFDckMsK0JBQTRCO0FBQzVCLHNEQUFzRDtBQUN0RCw2Q0FBNkM7QUFFN0MscUNBQTJDO0FBVXBDLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWlCO0lBSTVCLEtBQUssQ0FBQyxPQUFPO1FBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZELENBQUM7Q0FFRixDQUFBO0FBVFksOENBQWlCO0FBRTVCO0lBREMsSUFBQSxVQUFHLEdBQUU7OzhDQUNGOzRCQUZPLGlCQUFpQjtJQVI3QixJQUFBLG9CQUFhLEVBQUM7UUFDYixPQUFPLEVBQUU7WUFDUCxHQUFHO1lBQ0gsV0FBVztZQUNYLE9BQU87U0FDUjtRQUNELGFBQWEsRUFBRSxDQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUM3QyxDQUFDO0dBQ1csaUJBQWlCLENBUzdCO0FBQ0QsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLEdBQXVCLEVBQUUsRUFBRTtJQUN2RCxPQUFPLE1BQU0sSUFBQSwwQkFBZ0IsRUFBQztRQUM1QixJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSwrQ0FBK0M7UUFDckQsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDekIsNkJBQTZCO1FBQzdCLFFBQVEsRUFBRTtZQUNSLFNBQVMsR0FBRyxtQ0FBbUM7WUFDL0MsU0FBUyxHQUFHLG1DQUFtQztTQUNoRDtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQSJ9