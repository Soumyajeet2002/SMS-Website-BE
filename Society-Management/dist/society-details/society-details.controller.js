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
exports.SocietyDetailsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const society_details_service_1 = require("./society-details.service");
const create_society_details_dto_1 = require("./dto/create-society-details.dto");
const update_society_details_dto_1 = require("./dto/update-society-details.dto");
const query_society_details_dto_1 = require("./dto/query-society-details.dto");
const common_constant_1 = require("../common/constants/common.constant");
const role_decorator_1 = require("../common/decorators/role.decorator");
let SocietyDetailsController = class SocietyDetailsController {
    societyDetailsService;
    constructor(societyDetailsService) {
        this.societyDetailsService = societyDetailsService;
    }
    create(dto, req) {
        return this.societyDetailsService.executeByDBType('create', dto, req);
    }
    getById(id) {
        return this.societyDetailsService.executeByDBType('getById', id);
    }
    getAll(req, query) {
        return this.societyDetailsService.executeByDBType('getAll', query);
    }
    update(id, dto, req) {
        return this.societyDetailsService.executeByDBType('update', id, dto, req);
    }
};
exports.SocietyDetailsController = SocietyDetailsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_society_details_dto_1.CreateSocietySetupDetailsDto, Object]),
    __metadata("design:returntype", void 0)
], SocietyDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocietyDetailsController.prototype, "getById", null);
__decorate([
    (0, role_decorator_1.Roles)(common_constant_1.UserRole.SUPER_ADMIN, common_constant_1.UserRole.SOCIETY_ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_society_details_dto_1.QuerySocietyDto]),
    __metadata("design:returntype", void 0)
], SocietyDetailsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_society_details_dto_1.UpdateSocietyDetailsDto, Object]),
    __metadata("design:returntype", void 0)
], SocietyDetailsController.prototype, "update", null);
exports.SocietyDetailsController = SocietyDetailsController = __decorate([
    (0, swagger_1.ApiTags)('Societies'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('societies'),
    __metadata("design:paramtypes", [society_details_service_1.SocietyDetailsService])
], SocietyDetailsController);
//# sourceMappingURL=society-details.controller.js.map