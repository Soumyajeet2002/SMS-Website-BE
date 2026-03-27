"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyAdminModule = void 0;
const common_1 = require("@nestjs/common");
const society_admin_controller_1 = require("./society-admin.controller");
const society_admin_service_1 = require("./society-admin.service");
const typeorm_1 = require("@nestjs/typeorm");
const db_entities_1 = require("@sms/db-entities");
let SocietyAdminModule = class SocietyAdminModule {
};
exports.SocietyAdminModule = SocietyAdminModule;
exports.SocietyAdminModule = SocietyAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                db_entities_1.ServicesMasterEntity
            ])
        ],
        controllers: [society_admin_controller_1.SocietyAdminController],
        providers: [society_admin_service_1.SocietyAdminService]
    })
], SocietyAdminModule);
//# sourceMappingURL=society-admin.module.js.map