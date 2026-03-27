"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResidentDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const resident_details_controller_1 = require("./resident-details.controller");
const resident_details_service_1 = require("./resident-details.service");
const resident_details_entities_1 = require("./entities/resident-details.entities");
const typeorm_1 = require("@nestjs/typeorm");
const user_society_map_module_1 = require("../user-society-map/user-society-map.module");
let ResidentDetailsModule = class ResidentDetailsModule {
};
exports.ResidentDetailsModule = ResidentDetailsModule;
exports.ResidentDetailsModule = ResidentDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([resident_details_entities_1.ResidentDetails]),
            user_society_map_module_1.UserSocietyMapModule
        ],
        controllers: [resident_details_controller_1.ResidentDetailsController],
        providers: [resident_details_service_1.ResidentDetailsService]
    })
], ResidentDetailsModule);
//# sourceMappingURL=resident-details.module.js.map