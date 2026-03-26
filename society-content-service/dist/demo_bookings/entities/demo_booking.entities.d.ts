export declare enum BookingStatus {
    PENDING = 0,
    BOOKED = 1,
    COMPLETED = 2,
    REJECTED = 3,
    NO_SHOW = 4,
    DELETED = 5
}
export declare class DemoSlotBookingEntity {
    bookingId: string;
    guestId: string;
    scheduleId: string;
    meetingLink?: string;
    bookingStatus: BookingStatus;
    metadata?: string;
    createdBy?: string;
    createdAt: Date;
    updatedBy?: string;
    updatedAt?: Date;
}
