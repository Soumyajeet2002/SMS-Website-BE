import { GuestUserEntity } from '../entities/guest-users.entities';

// import { BookingStatus } from '../../demo_bookings/entities/demo_booking.entities';
export const guestUserResMapperSql = (
  data: GuestUserEntity,
  bookingStatus?: number,
) => {
  return {
    guest_Id: data.guestId,
    full_Name: data.fullName,
    mobile_No: data.mobileNo,
    email: data.email,
    city: data.city,
    projectDescription: data.projectDescription,
    source: data.source,
    status: data.status,
    // You can assign any BookingStatus value you want here
    bookingStatus: bookingStatus, // example, can be PENDING, BOOKED, etc.
    metadata: data.metadata as Record<string, unknown>, // safe for ESLint
    // createdBy: data.createdBy,
    // createdAt: data.createdAt,
    // updatedBy: data.updatedBy,
    // updatedAt: data.updatedAt,
  };
};
