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
exports.UserSocietyMapController = void 0;
const common_1 = require("@nestjs/common");
const user_society_map_service_1 = require("./user-society-map.service");
const swagger_1 = require("@nestjs/swagger");
const create_user_society_map_dto_1 = require("./dto/create-user-society-map.dto");
const update_user_society_map_dto_1 = require("./dto/update-user-society-map.dto");
const get_user_society_dto_1 = require("./dto/get-user-society.dto");
let UserSocietyMapController = class UserSocietyMapController {
    userSocietyService;
    constructor(userSocietyService) {
        this.userSocietyService = userSocietyService;
    }
    async createService(data, req) {
        return this.userSocietyService.executeByActionType('create', data, req);
    }
    async getUser(body) {
        return this.userSocietyService.executeByActionType('find', body);
    }
    async getAllUserSocietyMap() {
        return this.userSocietyService.executeByActionType('findAll');
    }
    async updateUserDetails(id, data, req) {
        return this.userSocietyService.executeByActionType('update', id, data, req);
    }
    async deleteUser(id) {
        return this.userSocietyService.executeByActionType('remove', id);
    }
};
exports.UserSocietyMapController = UserSocietyMapController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_society_map_dto_1.CreateUserSocietyMapDto, Object]),
    __metadata("design:returntype", Promise)
], UserSocietyMapController.prototype, "createService", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)('get-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_user_society_dto_1.GetUserSocietyDto]),
    __metadata("design:returntype", Promise)
], UserSocietyMapController.prototype, "getUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserSocietyMapController.prototype, "getAllUserSocietyMap", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_society_map_dto_1.UpdateUserSocietyMapDto, Object]),
    __metadata("design:returntype", Promise)
], UserSocietyMapController.prototype, "updateUserDetails", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserSocietyMapController.prototype, "deleteUser", null);
exports.UserSocietyMapController = UserSocietyMapController = __decorate([
    (0, common_1.Controller)('user-society-map'),
    __metadata("design:paramtypes", [user_society_map_service_1.UserSocietyMapService])
], UserSocietyMapController);
//# sourceMappingURL=user-society-map.controller.js.map