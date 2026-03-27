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
exports.BaseFlatListingDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class BaseFlatListingDto {
    societyId;
    title;
    description;
    availableFrom;
    rentAmount;
    securityDeposit;
    maintenanceAmount;
    rentNegotiable;
    flatType;
    bedrooms;
    bathrooms;
    balconies;
    furnishingType;
    carpetArea;
    areaUnit;
    countryCode;
    stateCode;
    districtCode;
    locality;
    pincode;
    latitude;
    longitude;
    contactName;
    primaryMobile;
    alternateMobile;
    email;
    whatsappAvailable;
    preferredContactTime;
    isPublic;
    isFeatured;
    showExactAddress;
    isContactPublic;
    status;
    expiresAt;
    details;
}
exports.BaseFlatListingDto = BaseFlatListingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "societyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Spacious 2BHK for Rent' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Well ventilated flat with park view',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-03-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "availableFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 15000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "rentAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 30000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "securityDeposit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "maintenanceAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseFlatListingDto.prototype, "rentNegotiable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2BHK' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "flatType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "bedrooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "bathrooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "balconies", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Semi-Furnished' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "furnishingType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1200 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "carpetArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'sq_ft' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "areaUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 356, description: 'ISO Country Code' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 21 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "stateCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 345 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "districtCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Sector 5' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "locality", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '751024' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "pincode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 20.2961 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 85.8245 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ramesh Kumar' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "contactName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '9876543210' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "primaryMobile", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '9123456780' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "alternateMobile", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'owner@email.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseFlatListingDto.prototype, "whatsappAvailable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '9AM - 6PM' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "preferredContactTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseFlatListingDto.prototype, "isPublic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseFlatListingDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseFlatListingDto.prototype, "showExactAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BaseFlatListingDto.prototype, "isContactPublic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0, default: 0, description: '0=Draft,1=Pending,2=Active' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BaseFlatListingDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-12-31T00:00:00.000Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BaseFlatListingDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: { facing: 'East', parking: true },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], BaseFlatListingDto.prototype, "details", void 0);
//# sourceMappingURL=base-flat-listing.dto.js.map