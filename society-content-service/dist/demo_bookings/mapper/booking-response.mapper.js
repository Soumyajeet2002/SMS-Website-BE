"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoSlotBookingMapper = void 0;
const demo_booking_entities_1 = require("../entities/demo_booking.entities");
class DemoSlotBookingMapper {
    static toResponse(entity) {
        return {
            bookingId: entity.bookingId,
            scheduleId: entity.scheduleId,
            guestId: entity.guestId,
            meetingLink: entity.meetingLink,
            status: entity.bookingStatus,
            bookingStatus: demo_booking_entities_1.BookingStatus[entity.bookingStatus] ?? 'PENDING',
            metadata: entity.metadata,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    static toResponseList(entities) {
        return entities.map((entity) => this.toResponse(entity));
    }
    static toCreateResponse(entities) {
        return {
            bookings: entities.map((entity) => ({
                bookingId: entity.bookingId,
                scheduleId: entity.scheduleId,
                guestId: entity.guestId,
                meetingLink: entity.meetingLink,
                status: entity.bookingStatus,
                bookingStatus: demo_booking_entities_1.BookingStatus[entity.bookingStatus] ?? 'PENDING',
                metadata: entity.metadata,
            })),
        };
    }
}
exports.DemoSlotBookingMapper = DemoSlotBookingMapper;
//# sourceMappingURL=booking-response.mapper.js.map