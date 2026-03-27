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
exports.TierCategoryMapController = void 0;
const common_1 = require("@nestjs/common");
const amenity_tier_category_map_service_1 = require("./amenity-tier-category-map.service");
const swagger_1 = require("@nestjs/swagger");
const create_amenity_tier_category_map_dto_1 = require("./dto/create-amenity-tier-category-map.dto");
const update_amenity_tier_category_map_dto_1 = require("./dto/update-amenity-tier-category-map.dto");
let TierCategoryMapController = class TierCategoryMapController {
    amenityTierCategoryMapService;
    constructor(amenityTierCategoryMapService) {
        this.amenityTierCategoryMapService = amenityTierCategoryMapService;
    }
    async createAmenityCatgMap(data, req) {
        return this.amenityTierCategoryMapService.executeByActionType('create', data, req);
    }
    async getCategoryAmenityMap(tierCode) {
        return this.amenityTierCategoryMapService.executeByActionType('findAll', tierCode);
    }
    async getAmenityCatgMap(id) {
        return this.amenityTierCategoryMapService.executeByActionType('findOne', id);
    }
    async updateAmenityCatgMap(data, req) {
        return this.amenityTierCategoryMapService.executeByActionType('update', data, req);
    }
};
exports.TierCategoryMapController = TierCategoryMapController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_amenity_tier_category_map_dto_1.CreateAmenityTierCategoryMapDto, Object]),
    __metadata("design:returntype", Promise)
], TierCategoryMapController.prototype, "createAmenityCatgMap", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiQuery)({
        name: 'tierCode',
        required: false,
        example: 'CORE'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('tierCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TierCategoryMapController.prototype, "getCategoryAmenityMap", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TierCategoryMapController.prototype, "getAmenityCatgMap", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_amenity_tier_category_map_dto_1.UpdateAmenityTierCategoryMap, Object]),
    __metadata("design:returntype", Promise)
], TierCategoryMapController.prototype, "updateAmenityCatgMap", null);
exports.TierCategoryMapController = TierCategoryMapController = __decorate([
    (0, common_1.Controller)('tier-category-map'),
    __metadata("design:paramtypes", [amenity_tier_category_map_service_1.TierCategoryMapService])
], TierCategoryMapController);
//# sourceMappingURL=amenity-tier-category-map.controller.js.map