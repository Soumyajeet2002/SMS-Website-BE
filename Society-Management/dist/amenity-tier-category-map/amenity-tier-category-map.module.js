"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenityTierCategoryMapModule = void 0;
const common_1 = require("@nestjs/common");
const amenity_tier_category_map_controller_1 = require("./amenity-tier-category-map.controller");
const amenity_tier_category_map_service_1 = require("./amenity-tier-category-map.service");
const typeorm_1 = require("@nestjs/typeorm");
const amenity_tier_category_map_entities_1 = require("./entities/amenity-tier-category-map.entities");
let AmenityTierCategoryMapModule = class AmenityTierCategoryMapModule {
};
exports.AmenityTierCategoryMapModule = AmenityTierCategoryMapModule;
exports.AmenityTierCategoryMapModule = AmenityTierCategoryMapModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([amenity_tier_category_map_entities_1.TierCategoryMapEntity])
        ],
        controllers: [amenity_tier_category_map_controller_1.TierCategoryMapController],
        providers: [amenity_tier_category_map_service_1.TierCategoryMapService]
    })
], AmenityTierCategoryMapModule);
//# sourceMappingURL=amenity-tier-category-map.module.js.map