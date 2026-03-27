"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatServiceModule = void 0;
const common_1 = require("@nestjs/common");
const flat_service_controller_1 = require("./flat-service.controller");
const flat_service_service_1 = require("./flat-service.service");
const typeorm_1 = require("@nestjs/typeorm");
const society_flat_listing_entity_1 = require("./entities/society-flat-listing.entity");
const media_module_1 = require("../media/media.module");
let FlatServiceModule = class FlatServiceModule {
};
exports.FlatServiceModule = FlatServiceModule;
exports.FlatServiceModule = FlatServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([society_flat_listing_entity_1.societyFlatListingEntity]), media_module_1.MediaModule,],
        controllers: [flat_service_controller_1.FlatServiceController],
        providers: [flat_service_service_1.FlatServiceService]
    })
], FlatServiceModule);
//# sourceMappingURL=flat-service.module.js.map