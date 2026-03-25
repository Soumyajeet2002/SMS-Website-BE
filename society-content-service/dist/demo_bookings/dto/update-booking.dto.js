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
exports.UpdateBookingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const demo_booking_entities_1 = require("../entities/demo_booking.entities");
class UpdateBookingDto {
    guestId;
    scheduleId;
    bookingStatus;
    meetingLink;
    metadata;
}
exports.UpdateBookingDto = UpdateBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Guest ID for booking',
        example: '45918264-4333-4ed4-8bda-a3040f3f0c62',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingDto.prototype, "guestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Schedule ID for booking',
        example: '31589428-512d-4d0a-9d00-7ae5a1b03463',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBookingDto.prototype, "scheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Booking status (0=Pending,1=Booked,2=Completed,3=Rejected,4=No Show)',
        enum: demo_booking_entities_1.BookingStatus,
        example: demo_booking_entities_1.BookingStatus.BOOKED,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(demo_booking_entities_1.BookingStatus),
    __metadata("design:type", Number)
], UpdateBookingDto.prototype, "bookingStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Meeting link for the booking',
        example: 'https://meet.google.com/abc-xyz',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingDto.prototype, "meetingLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Additional metadata for booking',
        example: 'Client prefers evening slot',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBookingDto.prototype, "metadata", void 0);
//# sourceMappingURL=update-booking.dto.js.map