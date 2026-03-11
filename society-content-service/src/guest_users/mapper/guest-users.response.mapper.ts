import { GuestUserEntity } from '../entities/guest-users.entities';

export const guestUserResMapperSql = (data: GuestUserEntity) => ({
  guest_Id: data.guestId,
  full_Name: data.fullName,
  mobile_No: data.mobileNo,
  email: data.email,
  city: data.city,
  projectDescription: data.projectDescription,
  source: data.source,
  status: data.status,
  metadata: data.metadata,
  // createdBy: data.createdBy,
  createdAt: data.createdAt,
  // updatedBy: data.updatedBy,
  updatedAt: data.updatedAt,
});
