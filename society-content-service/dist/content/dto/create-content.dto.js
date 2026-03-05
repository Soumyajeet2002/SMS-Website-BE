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
exports.CreateContentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const content_entity_1 = require("../entities/content.entity");
class CreateContentDto {
    societyId;
    slug;
    title;
    contentType;
    priority;
    isFeatured;
    publishAt;
    expireAt;
    metadata;
    status;
}
exports.CreateContentDto = CreateContentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Society ID to which content belongs',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContentDto.prototype, "societyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique slug for the content',
        example: 'homepage-banner',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContentDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the content',
        example: 'Welcome Banner',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content type (BANNER, NOTICE, BLOG, etc)',
        example: 'BANNER',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContentDto.prototype, "contentType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Priority for sorting display',
        example: 1,
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateContentDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the content is featured',
        example: true,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateContentDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Publish date & time',
        example: '2025-03-01T10:00:00Z',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateContentDto.prototype, "publishAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Expiry date & time',
        example: '2025-04-01T10:00:00Z',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateContentDto.prototype, "expireAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional metadata stored as JSON',
        example: { layout: 'full-width', theme: 'dark' },
        nullable: true,
        type: Object,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateContentDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Content status',
        enum: content_entity_1.ContentStatus,
        example: content_entity_1.ContentStatus.ACTIVE,
        default: content_entity_1.ContentStatus.ACTIVE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(content_entity_1.ContentStatus),
    __metadata("design:type", Number)
], CreateContentDto.prototype, "status", void 0);
//# sourceMappingURL=create-content.dto.js.map