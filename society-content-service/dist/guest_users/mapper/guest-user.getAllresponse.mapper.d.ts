import { GuestUserEntity } from '../entities/guest-users.entities';
export declare const guestUserGetAllResMapperSql: (data: GuestUserEntity, bookingMap?: Map<string, number>) => {
    guest_Id: string;
    full_Name: string;
    mobile_No: string;
    email: string | undefined;
    city: string | undefined;
    projectDescription: string | undefined;
    source: string | undefined;
    status: import("../entities/guest-users.entities").GuestUserStatus;
    bookingStatus: number;
    metadata: Record<string, unknown>;
};
