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
exports.QueryFlatDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class QueryFlatDto {
    societyId;
    memberId;
    flatType;
    furnishingType;
    pincode;
    page;
    limit;
    sortBy;
    sortOrder;
}
exports.QueryFlatDto = QueryFlatDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filter by Society ID (UUID). If not provided, flats from all societies will be returned.",
        example: "550e8400-e29b-41d4-a716-446655440000"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryFlatDto.prototype, "societyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filter by Member ID (Owner/Poster UUID).",
        example: "660e8400-e29b-41d4-a716-446655440111"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryFlatDto.prototype, "memberId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filter by Flat Type (e.g., 1BHK, 2BHK, 3BHK).",
        example: "2BHK"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryFlatDto.prototype, "flatType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filter by Furnishing Type (e.g., Furnished, Semi-Furnished, Unfurnished).",
        example: "Semi-Furnished"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryFlatDto.prototype, "furnishingType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filter by Pincode.",
        example: "751024"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryFlatDto.prototype, "pincode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Page Number",
        example: 1,
        default: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryFlatDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Number of records per page",
        example: 10,
        default: 10
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryFlatDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Field name to sort by (e.g., created_at, rent_amount, available_from).",
        example: "created_at",
        default: "created_at"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryFlatDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Sorting order",
        example: "DESC",
        enum: ["ASC", "DESC"],
        default: "DESC"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(["ASC", "DESC"]),
    __metadata("design:type", String)
], QueryFlatDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=query-flat.dto.js.map