import { DemoSlotBookingEntity, BookingStatus } from '../entities/demo_booking.entities';
export declare class DemoSlotBookingMapper {
    static toResponse(entity: DemoSlotBookingEntity): {
        bookingId: string;
        scheduleId: string;
        guestId: string;
        meetingLink: string | undefined;
        status: BookingStatus;
        bookingStatus: string;
        metadata: string | undefined;
        createdAt: Date;
        updatedAt: Date | undefined;
    };
    static toResponseList(entities: DemoSlotBookingEntity[]): {
        bookingId: string;
        scheduleId: string;
        guestId: string;
        meetingLink: string | undefined;
        status: BookingStatus;
        bookingStatus: string;
        metadata: string | undefined;
        createdAt: Date;
        updatedAt: Date | undefined;
    }[];
    static toCreateResponse(entities: DemoSlotBookingEntity[]): {
        bookings: {
            bookingId: string;
            scheduleId: string;
            guestId: string;
            meetingLink: string | undefined;
            status: BookingStatus;
            bookingStatus: string;
            metadata: string | undefined;
        }[];
    };
}
