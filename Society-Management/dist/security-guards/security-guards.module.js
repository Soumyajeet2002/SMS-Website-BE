"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityGuardsModule = void 0;
const common_1 = require("@nestjs/common");
const security_guards_controller_1 = require("./security-guards.controller");
const security_guards_service_1 = require("./security-guards.service");
const society_details_entity_1 = require("../society-details/entities/society-details.entity");
const security_guards_entities_1 = require("./entities/security-guards.entities");
const typeorm_1 = require("@nestjs/typeorm");
let SecurityGuardsModule = class SecurityGuardsModule {
};
exports.SecurityGuardsModule = SecurityGuardsModule;
exports.SecurityGuardsModule = SecurityGuardsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([security_guards_entities_1.SecurityGuardsEntity, society_details_entity_1.SocietySetupDetailsEntity])],
        controllers: [security_guards_controller_1.SecurityGuardsController],
        providers: [security_guards_service_1.SecurityGuardsService],
    })
], SecurityGuardsModule);
//# sourceMappingURL=security-guards.module.js.map