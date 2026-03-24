import { BookingStatus } from 'src/demo_bookings/entities/demo_booking.entities';
import { GuestUserEntity } from '../entities/guest-users.entities';

export const guestUserGetAllResMapperSql = (
  data: GuestUserEntity,
  bookingMap?: Map<string, number>,
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
    // bookingStatuspending: BookingStatus.PENDING,

    // Get booking status from map, default to 0
    bookingStatus: bookingMap?.get(data.guestId) ?? 0,

    metadata: data.metadata as Record<string, unknown>,
  };
};
