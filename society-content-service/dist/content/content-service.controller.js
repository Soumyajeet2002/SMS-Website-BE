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
const content_service_service_1 = require("./content-service.service");
const create_content_dto_1 = require("./dto/create-content.dto");
const swagger_1 = require("@nestjs/swagger");
let ContentController = class ContentController {
    contentService;
    constructor(contentService) {
        this.contentService = contentService;
    }
    async create(dto, req) {
        console.log('Received create content request with DTO:');
        return this.contentService.create(dto, req);
    }
    async findAll() {
        return this.contentService.findAll();
    }
    async findOne(id) {
        return this.contentService.findOne(id);
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_content_dto_1.CreateContentDto, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "findOne", null);
exports.ContentController = ContentController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('contents'),
    __metadata("design:paramtypes", [content_service_service_1.ContentService])
], ContentController);
//# sourceMappingURL=content-service.controller.js.map