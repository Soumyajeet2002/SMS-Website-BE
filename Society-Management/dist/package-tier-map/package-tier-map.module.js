"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageTierMapModule = void 0;
const common_1 = require("@nestjs/common");
const package_tier_map_controller_1 = require("./package-tier-map.controller");
const package_tier_map_service_1 = require("./package-tier-map.service");
const typeorm_1 = require("@nestjs/typeorm");
const package_tier_map_entities_1 = require("./entities/package-tier-map.entities");
let PackageTierMapModule = class PackageTierMapModule {
};
exports.PackageTierMapModule = PackageTierMapModule;
exports.PackageTierMapModule = PackageTierMapModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([package_tier_map_entities_1.PackageTierMapEntity])
        ],
        controllers: [package_tier_map_controller_1.PackageTierMapController],
        providers: [package_tier_map_service_1.PackageTierMapService]
    })
], PackageTierMapModule);
//# sourceMappingURL=package-tier-map.module.js.map