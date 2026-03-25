import { BookingStatus } from '../entities/demo_booking.entities';
export declare class UpdateBookingDto {
    guestId: string;
    scheduleId: string | null;
    bookingStatus?: BookingStatus;
    meetingLink?: string;
    metadata?: string;
}
