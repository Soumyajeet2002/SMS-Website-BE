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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageTierMapController = void 0;
const common_1 = require("@nestjs/common");
const package_tier_map_service_1 = require("./package-tier-map.service");
const swagger_1 = require("@nestjs/swagger");
const create_package_tier_map_dto_1 = require("./dto/create-package-tier-map.dto");
const update_package_tier_map_dto_1 = require("./dto/update-package-tier-map.dto");
let PackageTierMapController = class PackageTierMapController {
    packageTierService;
    constructor(packageTierService) {
        this.packageTierService = packageTierService;
    }
    async createCategoryAmenityMap(data, req) {
        return this.packageTierService.executeByAction('create', data, req);
    }
    async getCategoryAmenityMap(TierCode) {
        return this.packageTierService.executeByAction('find', TierCode);
    }
    async updateCategoryAmenityMap(data, req) {
        return this.packageTierService.executeByAction('update', data, req);
    }
};
exports.PackageTierMapController = PackageTierMapController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_package_tier_map_dto_1.CreatePackageTierMapDto, Object]),
    __metadata("design:returntype", Promise)
], PackageTierMapController.prototype, "createCategoryAmenityMap", null);
__decorate([
    (0, swagger_1.ApiQuery)({
        name: 'TierCode',
        required: false,
        example: 'CORE'
    }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('TierCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackageTierMapController.prototype, "getCategoryAmenityMap", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_package_tier_map_dto_1.UpdatePackageTierMapDto, Object]),
    __metadata("design:returntype", Promise)
], PackageTierMapController.prototype, "updateCategoryAmenityMap", null);
exports.PackageTierMapController = PackageTierMapController = __decorate([
    (0, common_1.Controller)('package-tier-map'),
    __metadata("design:paramtypes", [package_tier_map_service_1.PackageTierMapService])
], PackageTierMapController);
//# sourceMappingURL=package-tier-map.controller.js.map