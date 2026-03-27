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
exports.SocietyDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const society_details_entity_1 = require("./entities/society-details.entity");
const society_details_controller_1 = require("./society-details.controller");
const society_details_service_1 = require("./society-details.service");
const society_audit_service_1 = require("../audit/society-audit.service");
const audit_society_entity_1 = require("../audit/audit-society.entity");
const society_block_entity_1 = require("./entities/society-block.entity");
const users_entity_1 = require("./entities/users.entity");
let SocietyDetailsModule = class SocietyDetailsModule {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        common_1.Logger.log(`Society Details Module initialized with PostgreSQL`, 'Society Details Module');
    }
};
exports.SocietyDetailsModule = SocietyDetailsModule;
exports.SocietyDetailsModule = SocietyDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([society_details_entity_1.SocietySetupDetailsEntity, audit_society_entity_1.SocietyAuditLog, society_block_entity_1.SocietyBlockEntity, users_entity_1.UsersEntity]),
        ],
        controllers: [society_details_controller_1.SocietyDetailsController],
        providers: [society_details_service_1.SocietyDetailsService, config_1.ConfigService, society_audit_service_1.SocietyAuditService],
        exports: [society_details_service_1.SocietyDetailsService],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SocietyDetailsModule);
//# sourceMappingURL=society-details.module.js.map