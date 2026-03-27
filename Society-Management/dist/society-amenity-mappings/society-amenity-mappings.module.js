"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyAmenityMappingsModule = void 0;
const common_1 = require("@nestjs/common");
const society_amenity_mappings_controller_1 = require("./society-amenity-mappings.controller");
const society_amenity_mappings_service_1 = require("./society-amenity-mappings.service");
const typeorm_1 = require("@nestjs/typeorm");
const society_amenity_map_entities_1 = require("./entities/society-amenity-map.entities");
const db_entities_1 = require("@sms/db-entities");
let SocietyAmenityMappingsModule = class SocietyAmenityMappingsModule {
};
exports.SocietyAmenityMappingsModule = SocietyAmenityMappingsModule;
exports.SocietyAmenityMappingsModule = SocietyAmenityMappingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                society_amenity_map_entities_1.SocietyAmenityMappingsEntity,
                db_entities_1.AmenityEntity
            ])
        ],
        controllers: [society_amenity_mappings_controller_1.SocietyAmenityMappingsController],
        providers: [society_amenity_mappings_service_1.SocietyAmenityMappingsService]
    })
], SocietyAmenityMappingsModule);
//# sourceMappingURL=society-amenity-mappings.module.js.map