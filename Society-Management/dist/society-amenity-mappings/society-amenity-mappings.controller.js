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
exports.SocietyAmenityMappingsController = void 0;
const common_1 = require("@nestjs/common");
const society_amenity_mappings_service_1 = require("./society-amenity-mappings.service");
const swagger_1 = require("@nestjs/swagger");
const create_society_amenity_map_dto_1 = require("./dto/create-society-amenity-map.dto");
const get_by_societyId_dto_1 = require("./dto/get-by-societyId.dto");
let SocietyAmenityMappingsController = class SocietyAmenityMappingsController {
    societyAmenityMapService;
    constructor(societyAmenityMapService) {
        this.societyAmenityMapService = societyAmenityMapService;
    }
    async createCSocietyAmenityMap(data, req) {
        return this.societyAmenityMapService.executeByAction('create', data, req);
    }
    async getBySocietyId(body) {
        return this.societyAmenityMapService.executeByAction('findById', body.societyId);
    }
};
exports.SocietyAmenityMappingsController = SocietyAmenityMappingsController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_society_amenity_map_dto_1.CreateSocietyAmenityMapDto, Object]),
    __metadata("design:returntype", Promise)
], SocietyAmenityMappingsController.prototype, "createCSocietyAmenityMap", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)('/by-societyid'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_by_societyId_dto_1.SocietyIdDto]),
    __metadata("design:returntype", Promise)
], SocietyAmenityMappingsController.prototype, "getBySocietyId", null);
exports.SocietyAmenityMappingsController = SocietyAmenityMappingsController = __decorate([
    (0, common_1.Controller)('society-amenity-mappings'),
    __metadata("design:paramtypes", [society_amenity_mappings_service_1.SocietyAmenityMappingsService])
], SocietyAmenityMappingsController);
//# sourceMappingURL=society-amenity-mappings.controller.js.map