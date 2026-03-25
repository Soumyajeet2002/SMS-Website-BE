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
exports.CreateGuestUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateGuestUserDto {
    fullName;
    mobileNo;
    email;
    city;
    projectDescription;
}
exports.CreateGuestUserDto = CreateGuestUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full name of the guest user',
        example: 'Test User',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateGuestUserDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mobile number of the guest user',
        example: '9876543210',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[0-9]{10}$/, {
        message: 'Mobile number must be exactly 10 digits',
    }),
    __metadata("design:type", String)
], CreateGuestUserDto.prototype, "mobileNo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Email address of the guest user',
        example: 'test.user@example.com',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], CreateGuestUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'City where the guest user is located',
        example: 'Bhubaneswar',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuestUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'description of the guest user project or requirement',
        example: 'Looking for society management software for a residential complex',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuestUserDto.prototype, "projectDescription", void 0);
//# sourceMappingURL=create-guest-user.dto.js.map