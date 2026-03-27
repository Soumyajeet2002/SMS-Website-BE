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
exports.FlatServiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const flat_service_service_1 = require("./flat-service.service");
const create_society_flat_listing_dto_1 = require("./dto/create-society-flat-listing.dto");
const update_society_flat_listing_dto_1 = require("./dto/update-society-flat-listing.dto");
const query_flat_dto_1 = require("./dto/query-flat.dto");
let FlatServiceController = class FlatServiceController {
    flatService;
    constructor(flatService) {
        this.flatService = flatService;
    }
    async createFlat(req, data) {
        return this.flatService.executeByDBType('create', data, req);
    }
    async getFlatList(query) {
        return this.flatService.executeByDBType('getAll', query);
    }
    async updateFlat(data, req) {
        return this.flatService.executeByDBType('update', data, req);
    }
};
exports.FlatServiceController = FlatServiceController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, create_society_flat_listing_dto_1.CreateSocietyFlatListingDto]),
    __metadata("design:returntype", Promise)
], FlatServiceController.prototype, "createFlat", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_flat_dto_1.QueryFlatDto]),
    __metadata("design:returntype", Promise)
], FlatServiceController.prototype, "getFlatList", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_society_flat_listing_dto_1.UpdateSocietyFlatListingDto, Object]),
    __metadata("design:returntype", Promise)
], FlatServiceController.prototype, "updateFlat", null);
exports.FlatServiceController = FlatServiceController = __decorate([
    (0, common_1.Controller)('flat-service'),
    __metadata("design:paramtypes", [flat_service_service_1.FlatServiceService])
], FlatServiceController);
//# sourceMappingURL=flat-service.controller.js.map