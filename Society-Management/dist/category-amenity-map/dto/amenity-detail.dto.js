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
exports.AmenityDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AmenityDetailDto {
    amenityId;
    displayOrder;
    status;
    metadata;
}
exports.AmenityDetailDto = AmenityDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amenity identifier',
        example: '5e518167-5a13-4c2d-b694-3cad433e0c17',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AmenityDetailDto.prototype, "amenityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Display order of amenity within the category',
        example: 1,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AmenityDetailDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status of mapping (1 = active, 2 = inactive)',
        example: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], AmenityDetailDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional metadata for category-amenity mapping',
        example: { icon: 'pool', isPaid: false },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], AmenityDetailDto.prototype, "metadata", void 0);
//# sourceMappingURL=amenity-detail.dto.js.map