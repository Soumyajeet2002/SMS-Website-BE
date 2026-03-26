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
exports.DemoSlotBookingEntity = exports.BookingStatus = void 0;
const typeorm_1 = require("typeorm");
var BookingStatus;
(function (BookingStatus) {
    BookingStatus[BookingStatus["PENDING"] = 0] = "PENDING";
    BookingStatus[BookingStatus["BOOKED"] = 1] = "BOOKED";
    BookingStatus[BookingStatus["COMPLETED"] = 2] = "COMPLETED";
    BookingStatus[BookingStatus["REJECTED"] = 3] = "REJECTED";
    BookingStatus[BookingStatus["NO_SHOW"] = 4] = "NO_SHOW";
    BookingStatus[BookingStatus["DELETED"] = 5] = "DELETED";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
let DemoSlotBookingEntity = class DemoSlotBookingEntity {
    bookingId;
    guestId;
    scheduleId;
    meetingLink;
    bookingStatus;
    metadata;
    createdBy;
    createdAt;
    updatedBy;
    updatedAt;
};
exports.DemoSlotBookingEntity = DemoSlotBookingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'booking_id' }),
    __metadata("design:type", String)
], DemoSlotBookingEntity.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guest_id', type: 'uuid' }),
    __metadata("design:type", String)
], DemoSlotBookingEntity.prototype, "guestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'schedule_id', type: 'uuid' }),
    __metadata("design:type", String)
], DemoSlotBookingEntity.prototype, "scheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meeting_link', type: 'text', nullable: true }),
    __metadata("design:type", String)
], DemoSlotBookingEntity.prototype, "meetingLink", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'booking_status',
        type: 'smallint',
        default: BookingStatus.PENDING,
        comment: '0=Pending,1=Booked,2=Completed,3=Cancelled,4=No Show, 5=Deleted',
    }),
    __metadata("design:type", Number)
], DemoSlotBookingEntity.prototype, "bookingStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata', type: 'jsonb', nullable: true, default: '{}' }),
    __metadata("design:type", String)
], DemoSlotBookingEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], DemoSlotBookingEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'NOW()',
    }),
    __metadata("design:type", Date)
], DemoSlotBookingEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], DemoSlotBookingEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], DemoSlotBookingEntity.prototype, "updatedAt", void 0);
exports.DemoSlotBookingEntity = DemoSlotBookingEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'demo_bookings', schema: 'society_cms' }),
    (0, typeorm_1.Index)('idx_demo_bookings_guest', ['guestId']),
    (0, typeorm_1.Index)('idx_demo_bookings_schedule', ['scheduleId'])
], DemoSlotBookingEntity);
//# sourceMappingURL=demo_booking.entities.js.map