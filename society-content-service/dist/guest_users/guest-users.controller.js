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
exports.GuestUsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guest_users_service_1 = require("./guest-users.service");
const create_guest_user_dto_1 = require("./dto/create-guest-user.dto");
const update_guest_user_dto_1 = require("./dto/update-guest-user.dto");
const query_guest_user_dto_1 = require("./dto/query-guest-user.dto");
const public_decorator_1 = require("../common/decorators/public.decorator");
let GuestUsersController = class GuestUsersController {
    guestUsersService;
    constructor(guestUsersService) {
        this.guestUsersService = guestUsersService;
    }
    createSecure(data, req) {
        return this.guestUsersService.executeByActionType('create', data, req);
    }
    createPublic(data, req) {
        return this.guestUsersService.executeByActionType('create', data, req);
    }
    findAll(query) {
        return this.guestUsersService.executeByActionType('findAll', query);
    }
    findOne(id) {
        return this.guestUsersService.executeByActionType('findOne', id);
    }
    update(id, updateGuestUserDto) {
        return this.guestUsersService.executeByActionType('update', id, updateGuestUserDto);
    }
    remove(id) {
        return this.guestUsersService.executeByActionType('remove', id);
    }
};
exports.GuestUsersController = GuestUsersController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new guest user Token Based' }),
    (0, common_1.Post)('secure'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_guest_user_dto_1.CreateGuestUserDto, Object]),
    __metadata("design:returntype", void 0)
], GuestUsersController.prototype, "createSecure", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new guest user Public' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('book-demo'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_guest_user_dto_1.CreateGuestUserDto, Object]),
    __metadata("design:returntype", void 0)
], GuestUsersController.prototype, "createPublic", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all guest users with pagination and search' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_guest_user_dto_1.QueryGuestUserDto]),
    __metadata("design:returntype", void 0)
], GuestUsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Get guest user by ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuestUsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Update guest user by ID' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_guest_user_dto_1.UpdateGuestUserDto]),
    __metadata("design:returntype", void 0)
], GuestUsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete guest user by ID ' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuestUsersController.prototype, "remove", null);
exports.GuestUsersController = GuestUsersController = __decorate([
    (0, swagger_1.ApiTags)('Guest Users'),
    (0, common_1.Controller)('guest-users'),
    __metadata("design:paramtypes", [guest_users_service_1.GuestUsersService])
], GuestUsersController);
//# sourceMappingURL=guest-users.controller.js.map