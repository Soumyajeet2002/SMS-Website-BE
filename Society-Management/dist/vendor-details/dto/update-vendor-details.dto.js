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
exports.UpdateVendorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const vendor_details_entities_1 = require("../entities/vendor-details.entities");
class UpdateVendorDto {
    vendorName;
    vendorType;
    email;
    phoneNo;
    vendorStatus;
    address;
    metadata;
}
exports.UpdateVendorDto = UpdateVendorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Vendor Name', maxLength: 150 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], UpdateVendorDto.prototype, "vendorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Vendor Type', maxLength: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateVendorDto.prototype, "vendorType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Vendor Email', example: 'vendor@example.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], UpdateVendorDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Vendor Phone Number', maxLength: 20 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateVendorDto.prototype, "phoneNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vendor Status (0=Inactive,1=Active,2=Blacklisted)',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(vendor_details_entities_1.VendorStatus),
    __metadata("design:type", Number)
], UpdateVendorDto.prototype, "vendorStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Vendor Address' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVendorDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Metadata as JSON object' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateVendorDto.prototype, "metadata", void 0);
//# sourceMappingURL=update-vendor-details.dto.js.map