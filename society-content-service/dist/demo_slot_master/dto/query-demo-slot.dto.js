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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryDemoSlotDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QueryDemoSlotDto {
    search;
    page;
    limit;
    sortBy;
    sortOrder;
}
exports.QueryDemoSlotDto = QueryDemoSlotDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search demo slots by slot name',
        example: 'Morning',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryDemoSlotDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number',
        example: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], QueryDemoSlotDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Limit per page',
        example: 10,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], QueryDemoSlotDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort by field',
        example: 'createdAt',
        default: 'createdAt',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryDemoSlotDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort order',
        example: 'DESC',
        enum: ['ASC', 'DESC'],
        default: 'DESC',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['ASC', 'DESC']),
    __metadata("design:type", String)
], QueryDemoSlotDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=query-demo-slot.dto.js.map