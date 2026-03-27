"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vendor_details_entities_1 = require("./entities/vendor-details.entities");
const vendor_details_service_1 = require("./vendor-details.service");
const vendor_details_controller_1 = require("./vendor-details.controller");
let VendorDetailsModule = class VendorDetailsModule {
};
exports.VendorDetailsModule = VendorDetailsModule;
exports.VendorDetailsModule = VendorDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vendor_details_entities_1.VendorDetailsEntity])],
        controllers: [vendor_details_controller_1.VendorDetailsController],
        providers: [vendor_details_service_1.VendorDetailsService],
        exports: [vendor_details_service_1.VendorDetailsService],
    })
], VendorDetailsModule);
//# sourceMappingURL=vendor-details.module.js.map