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
exports.SecurityGuardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const security_guards_service_1 = require("./security-guards.service");
const create_security_guards_dto_1 = require("./dto/create-security-guards.dto");
const query_security_guards_dto_1 = require("./dto/query-security-guards.dto");
let SecurityGuardsController = class SecurityGuardsController {
    securityGuardsService;
    constructor(securityGuardsService) {
        this.securityGuardsService = securityGuardsService;
    }
    async createGuards(req, dto) {
        return this.securityGuardsService.executeByActionType('create', dto, req);
    }
    async findAll(query) {
        return this.securityGuardsService.executeByActionType('findAll', query);
    }
};
exports.SecurityGuardsController = SecurityGuardsController;
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        create_security_guards_dto_1.CreateSecurityGuardsDto]),
    __metadata("design:returntype", Promise)
], SecurityGuardsController.prototype, "createGuards", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_security_guards_dto_1.GetSecurityGuardsDto]),
    __metadata("design:returntype", Promise)
], SecurityGuardsController.prototype, "findAll", null);
exports.SecurityGuardsController = SecurityGuardsController = __decorate([
    (0, common_1.Controller)('security-guards'),
    __metadata("design:paramtypes", [security_guards_service_1.SecurityGuardsService])
], SecurityGuardsController);
//# sourceMappingURL=security-guards.controller.js.map