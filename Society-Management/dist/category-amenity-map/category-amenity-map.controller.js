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
exports.CategoryAmenityMapController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_category_amenity_map_dto_1 = require("./dto/create-category-amenity-map.dto");
const category_amenity_map_service_1 = require("./category-amenity-map.service");
const update_category_amenity_map_dto_1 = require("./dto/update-category-amenity-map.dto");
let CategoryAmenityMapController = class CategoryAmenityMapController {
    categoryamenityService;
    constructor(categoryamenityService) {
        this.categoryamenityService = categoryamenityService;
    }
    async createCategoryAmenityMap(data, req) {
        return this.categoryamenityService.executeByAction('create', data, req);
    }
    async getCategoryAmenityMap(categoryCode) {
        return this.categoryamenityService.executeByAction('find', categoryCode);
    }
    async updateCategoryAmenityMap(data, req) {
        return this.categoryamenityService.executeByAction('update', data, req);
    }
};
exports.CategoryAmenityMapController = CategoryAmenityMapController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_amenity_map_dto_1.CreateCategoryAmenityMapDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryAmenityMapController.prototype, "createCategoryAmenityMap", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiQuery)({
        name: 'CategoryCode',
        required: false,
        example: 'SECURITY'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('CategoryCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryAmenityMapController.prototype, "getCategoryAmenityMap", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_amenity_map_dto_1.UpdateCategoryAmenityMapDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryAmenityMapController.prototype, "updateCategoryAmenityMap", null);
exports.CategoryAmenityMapController = CategoryAmenityMapController = __decorate([
    (0, common_1.Controller)('category-amenity-map'),
    __metadata("design:paramtypes", [category_amenity_map_service_1.CategoryAmenityMapService])
], CategoryAmenityMapController);
//# sourceMappingURL=category-amenity-map.controller.js.map