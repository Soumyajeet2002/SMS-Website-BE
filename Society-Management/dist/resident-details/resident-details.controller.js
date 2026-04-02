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
exports.ResidentDetailsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const resident_details_service_1 = require("./resident-details.service");
const user_society_map_service_1 = require("../user-society-map/user-society-map.service");
const create_resident_details_dto_1 = require("./dto/create-resident-details.dto");
const query_resident_details_dto_1 = require("./dto/query-resident-details.dto");
let ResidentDetailsController = class ResidentDetailsController {
    residentDetailsService;
    userSocietyService;
    constructor(residentDetailsService, userSocietyService) {
        this.residentDetailsService = residentDetailsService;
        this.userSocietyService = userSocietyService;
    }
    async createService(data, req) {
        let payload = {
            userId: data.residentId,
            societyId: data.societyId,
            userRole: data.ownerType,
            isActive: true,
            createdBy: data.residentId
        };
        const res1 = await this.userSocietyService.executeByActionType('create', payload, req);
        if (!res1.success) {
            throw new Error('User-Society mapping failed');
        }
        return await this.residentDetailsService.executeByActionType('create', data, req);
    }
    async updateService(id, data, req) {
        let payload = {
            userId: data.residentId,
            societyId: data.societyId,
            userRole: data.ownerType,
            isActive: true,
            createdBy: data.residentId
        };
        const res1 = await this.userSocietyService.executeByActionType('update', id, payload, req);
        if (!res1.success) {
            throw new Error('User-Society mapping failed');
        }
        return await this.residentDetailsService.executeByActionType('update', data, req);
    }
    async getResidentById(residentId) {
        return this.residentDetailsService.executeByActionType('getById', residentId);
    }
    getResidentDetails(query) {
        return this.residentDetailsService.executeByActionType('getAll', query);
    }
};
exports.ResidentDetailsController = ResidentDetailsController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)('create-resident'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resident_details_dto_1.CreateResidentMapDto, Object]),
    __metadata("design:returntype", Promise)
], ResidentDetailsController.prototype, "createService", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)('update-resident/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_resident_details_dto_1.CreateResidentMapDto, Object]),
    __metadata("design:returntype", Promise)
], ResidentDetailsController.prototype, "updateService", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)('getResidentDetails/:residentId'),
    __param(0, (0, common_1.Param)('residentId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResidentDetailsController.prototype, "getResidentById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)('getResidentDetails'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_resident_details_dto_1.QueryResidentDto]),
    __metadata("design:returntype", void 0)
], ResidentDetailsController.prototype, "getResidentDetails", null);
exports.ResidentDetailsController = ResidentDetailsController = __decorate([
    (0, common_1.Controller)('resident-details'),
    __metadata("design:paramtypes", [resident_details_service_1.ResidentDetailsService,
        user_society_map_service_1.UserSocietyMapService])
], ResidentDetailsController);
//# sourceMappingURL=resident-details.controller.js.map