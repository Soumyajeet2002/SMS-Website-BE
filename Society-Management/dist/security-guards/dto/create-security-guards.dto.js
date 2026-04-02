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
exports.CreateSecurityGuardsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateSecurityGuardsDto {
    guardId;
    vendorId;
    dateOfBirth;
    gender;
    emergencyContact;
    permanentAddress;
    currentAddress;
    profilePhotoUrl;
    idType;
    idNumber;
    idProofUrl;
    joiningDate;
    employmentType;
    designation;
    metadata;
    status;
}
exports.CreateSecurityGuardsDto = CreateSecurityGuardsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Guard UUID (from identity service)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "guardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vendor/Agency UUID',
        example: '550e8400-e29b-41d4-a716-446655440111',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "vendorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of birth of the guard',
        example: '1990-05-10',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gender (M/F/O)',
        example: 'M',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['M', 'F', 'O']),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Emergency contact number',
        example: '9876543210',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 15),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "emergencyContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Permanent address',
        example: 'Bhubaneswar, Odisha',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "permanentAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current address',
        example: 'Cuttack, Odisha',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "currentAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Profile photo URL',
        example: 'https://example.com/profile.jpg',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "profilePhotoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID type (Aadhaar, PAN, etc.)',
        example: 'Aadhaar',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "idType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID number',
        example: '123456789012',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "idNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID proof document URL',
        example: 'https://example.com/id-proof.pdf',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "idProofUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Joining date',
        example: '2024-01-01',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "joiningDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employment type (P = Permanent, C = Contract)',
        example: 'P',
        enum: ['P', 'C'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['P', 'C']),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "employmentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Designation of the guard',
        example: 'Security Guard',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSecurityGuardsDto.prototype, "designation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Metadata (JSON object)',
        example: { shift: 'night', uniformIssued: true },
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateSecurityGuardsDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status (1 = Active, 0 = Inactive, 2 = Deleted)',
        example: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSecurityGuardsDto.prototype, "status", void 0);
//# sourceMappingURL=create-security-guards.dto.js.map