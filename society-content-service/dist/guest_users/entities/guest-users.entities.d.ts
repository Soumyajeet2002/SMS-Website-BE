export declare enum GuestUserStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    DELETED = 2
}
export declare enum BookingStatusGuest {
    PENDING = 0,
    BOOKED = 1,
    COMPLETED = 2,
    CANCELLED = 3,
    NO_SHOW = 4
}
export declare class GuestUserEntity {
    guestId: string;
    fullName: string;
    mobileNo: string;
    email?: string;
    city?: string;
    projectDescription?: string;
    source?: string;
    status: GuestUserStatus;
    metadata?: Record<string, any>;
    createdBy?: string;
    createdAt: Date;
    updatedBy?: string;
    updatedAt?: Date;
}
