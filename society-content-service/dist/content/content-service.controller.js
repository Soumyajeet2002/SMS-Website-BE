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
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const content_service_service_1 = require("./content-service.service");
const create_content_dto_1 = require("./dto/create-content.dto");
const query_contents_dto_1 = require("./dto/query-contents.dto");
const update_content_dto_1 = require("./dto/update-content.dto");
let ContentController = class ContentController {
    contentService;
    constructor(contentService) {
        this.contentService = contentService;
    }
    async createContent(data, req) {
        return this.contentService.executeByActionType('create', data, req);
    }
    async findAll(query) {
        return this.contentService.executeByActionType('findAll', query);
    }
    async getContent(id) {
        return this.contentService.executeByActionType('findOne', id);
    }
    async updateContent(id, dto) {
        return this.contentService.executeByActionType('update', id, dto);
    }
    deleteContent(id) {
        return this.contentService.executeByActionType('remove', id);
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_content_dto_1.CreateContentDto, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "createContent", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_contents_dto_1.QueryContentDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getContent", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_content_dto_1.UpdateContentDto]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "updateContent", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "deleteContent", null);
exports.ContentController = ContentController = __decorate([
    (0, common_1.Controller)('contents'),
    __metadata("design:paramtypes", [content_service_service_1.ContentService])
], ContentController);
//# sourceMappingURL=content-service.controller.js.map