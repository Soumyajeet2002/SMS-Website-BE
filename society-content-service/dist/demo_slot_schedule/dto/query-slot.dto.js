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
exports.GetScheduleQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const slot_schedule_entities_1 = require("../entities/slot-schedule.entities");
class GetScheduleQueryDto {
    demoBy;
    search;
    date;
    page = 1;
    limit;
    sortBy = 'createdAt';
    sortOrder = 'DESC';
    status;
}
exports.GetScheduleQueryDto = GetScheduleQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter schedules by demoBy (UUID or name)',
        example: 'Gyana or c3f7c1c0-9b0d-4c9b-9b9a-123456789abc',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetScheduleQueryDto.prototype, "demoBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search schedules by keyword',
        example: 'Morning',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetScheduleQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filter by schedule date',
        example: '2026-03-12',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetScheduleQueryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number',
        example: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetScheduleQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Number of records per page',
        example: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetScheduleQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort by field',
        example: 'createdAt',
        default: 'createdAt',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetScheduleQueryDto.prototype, "sortBy", void 0);
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
], GetScheduleQueryDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status of slot schedule [0=Inactive, 1=Active, 2=Deleted]',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetScheduleQueryDto.prototype, "status", void 0);
//# sourceMappingURL=query-slot.dto.js.map