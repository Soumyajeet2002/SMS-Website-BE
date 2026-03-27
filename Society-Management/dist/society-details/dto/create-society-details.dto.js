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
exports.CreateSocietySetupDetailsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const block_dto_1 = require("./block.dto");
const admin_society_map_dto_1 = require("./admin-society-map.dto");
class CreateSocietySetupDetailsDto {
    societyName;
    societyCode;
    registrationNumber;
    societyType;
    societyLevelId;
    societyLevelCode;
    establishmentYear;
    totalArea;
    numberOfBlocks;
    blocks;
    addressLine1;
    areaLocality;
    city;
    districtCode;
    stateCode;
    pincode;
    landmark;
    adminDetails;
    packageId;
    status;
}
exports.CreateSocietySetupDetailsDto = CreateSocietySetupDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Green Valley Residency' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "societyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GVR001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "societyCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REG-2025-001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'APARTMENT' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "societyType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-value' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "societyLevelId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'PREMIUM' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "societyLevelCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2015 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateSocietySetupDetailsDto.prototype, "establishmentYear", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 12500.75 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSocietySetupDetailsDto.prototype, "totalArea", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateSocietySetupDetailsDto.prototype, "numberOfBlocks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [block_dto_1.BlockDto],
        description: 'Block-wise infrastructure details',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => block_dto_1.BlockDto),
    __metadata("design:type", Array)
], CreateSocietySetupDetailsDto.prototype, "blocks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "addressLine1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "areaLocality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "districtCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "stateCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "pincode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "landmark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [admin_society_map_dto_1.AdminSocietyMapDto],
        description: 'Admin details',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => admin_society_map_dto_1.AdminSocietyMapDto),
    __metadata("design:type", Array)
], CreateSocietySetupDetailsDto.prototype, "adminDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSocietySetupDetailsDto.prototype, "packageId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(4),
    __metadata("design:type", Number)
], CreateSocietySetupDetailsDto.prototype, "status", void 0);
//# sourceMappingURL=create-society-details.dto.js.map