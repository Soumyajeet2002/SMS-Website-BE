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
exports.CreateResidentMapDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateResidentMapDto {
    residentId;
    societyId;
    blockId;
    flatNumber;
    ownerType;
    moveInDate;
    emergencyContact;
    idProofType;
    idProofDoc;
    profilePic;
}
exports.CreateResidentMapDto = CreateResidentMapDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Resident UUID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateResidentMapDto.prototype, "residentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Society ID',
        example: '660e8400-e29b-41d4-a716-446655440111',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateResidentMapDto.prototype, "societyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Block ID',
        example: 101,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateResidentMapDto.prototype, "blockId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Flat Number',
        example: 'A-101',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateResidentMapDto.prototype, "flatNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Owner Type (owner/tenant)',
        example: 'owner',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateResidentMapDto.prototype, "ownerType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Move-in Date',
        example: '2024-01-15',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateResidentMapDto.prototype, "moveInDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Emergency Contact Number',
        example: '9876543210',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResidentMapDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID Proof Type',
        example: 'Aadhar',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateResidentMapDto.prototype, "idProofType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID Proof Document URL or Number',
        example: '1234-5678-9012',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResidentMapDto.prototype, "idProofDoc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Profile Picture URL',
        example: 'https://example.com/profile.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResidentMapDto.prototype, "profilePic", void 0);
//# sourceMappingURL=create-resident-details.dto.js.map