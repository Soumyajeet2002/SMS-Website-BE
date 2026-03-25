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
exports.QueryGuestUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const demo_booking_entities_1 = require("../../demo_bookings/entities/demo_booking.entities");
class QueryGuestUserDto {
    search;
    page;
    limit;
    sortBy;
    sortOrder;
    bookingStatus;
}
exports.QueryGuestUserDto = QueryGuestUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search guest users by full name, email, or mobile number',
        example: 'john',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryGuestUserDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Page number',
        example: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], QueryGuestUserDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Limit per page',
        example: 10,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], QueryGuestUserDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sort by field',
        example: 'createdAt',
        default: 'createdAt',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryGuestUserDto.prototype, "sortBy", void 0);
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
], QueryGuestUserDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'search with booking status',
        example: '1',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsEnum)(demo_booking_entities_1.BookingStatus),
    __metadata("design:type", Number)
], QueryGuestUserDto.prototype, "bookingStatus", void 0);
//# sourceMappingURL=query-guest-user.dto.js.map