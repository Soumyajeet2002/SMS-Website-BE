import { BookingStatus } from '../../demo_bookings/entities/demo_booking.entities';
export declare class QueryGuestUserDto {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    bookingStatus?: BookingStatus;
}
