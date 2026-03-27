// import { SocietySetupDetailsEntity } from "../entities/society-details.entity";

import { SocietySetupDetailsEntity } from "../entities/society-details.entity";



// export const societyDetailsResponseMapper = (
//   data: SocietySetupDetailsEntity,
// ) => {
//   if (!data) return null;

//   return {
//     societyId: data.societyId,

//     /* -------- BASIC DETAILS -------- */
//     societyName: data.societyName,
//     societyCode: data.societyCode,
//     registrationNumber: data.registrationNumber,
//     societyType: data.societyType,
//     societyLevel: data.societyLevelCode,
//     establishmentYear: data.establishmentYear,
//     totalArea: data.totalArea,

//     /* -------- BLOCKS FROM BLOCK TABLE -------- */
//     blocks:
//       data.blocks?.map((block) => ({
//         blockName: block.blockName,
//         numberOfFloors: block.totalFloors,
//         totalFlats: block.totalFlats,
//         parkingSlots: block.parkingSlot ?? null,
//         blockCode: block.blockCode,
//       })) ?? [],

//     /* -------- ADDRESS -------- */
//     addressLine1: data.addressLine1,
//     areaLocality: data.areaLocality,
//     city: data.city,
//     districtCode: data.districtCode,
//     stateCode: data.stateCode,
//     pincode: data.pincode,
//     landmark: data.landmark,

//     /* -------- ADMIN DETAILS -------- */
//     adminName: data.adminName,
//     adminMobile: data.adminMobile,
//     adminEmail: data.adminEmail,

//     /* -------- PACKAGE -------- */
//     packageId: data.packageId,

//     /* -------- STATUS & AUDIT -------- */
//     status: data.status,
//     onboardingDate: data.onboardingDate,
//     isDeleted: data.isDeleted,

//     createdBy: data.createdBy,
//     createdAt: data.createdAt,
//     updatedBy: data.updatedBy,
//     updatedAt: data.updatedAt,
//   };
// };


export const societyDetailsResponseMapper = (
  data: SocietySetupDetailsEntity & { admins?: any[] },
) => {
  if (!data) return null;

  return {
    societyId: data.societyId,

    /* -------- BASIC DETAILS -------- */
    societyName: data.societyName,
    societyCode: data.societyCode,
    registrationNumber: data.registrationNumber,
    societyType: data.societyType,
    societyLevel: data.societyLevelCode,
    establishmentYear: data.establishmentYear,
    totalArea: data.totalArea,

    /* -------- BLOCKS -------- */
    blocks:
      data.blocks?.map((block) => ({
        blockName: block.blockName,
        numberOfFloors: block.totalFloors,
        totalFlats: block.totalFlats,
        parkingSlots: block.parkingSlot ?? null,
        blockCode: block.blockCode,
        blockId: block.blockId,
      })) ?? [],

    /* -------- ADMIN DETAILS -------- */
    adminDetails:
      data.admins?.map((admin) => ({
        userId: admin.user_id,
        roleName: admin.user_role,
        roleId : admin.user?.role_unq_id,
        name: admin.user?.name ?? null,
        email: admin.user?.email ?? null,
        mobile: admin.user?.mobile ?? null,
      })) ?? [],

    /* -------- ADDRESS -------- */
    addressLine1: data.addressLine1,
    areaLocality: data.areaLocality,
    city: data.city,
    districtCode: data.districtCode,
    stateCode: data.stateCode,
    pincode: data.pincode,
    landmark: data.landmark,

    /* -------- PACKAGE -------- */
    packageId: data.packageId,

    /* -------- STATUS -------- */
    status: data.status,
    onboardingDate: data.onboardingDate,
    isDeleted: data.isDeleted,

    /* -------- AUDIT -------- */
    createdBy: data.createdBy,
    createdAt: data.createdAt,
    updatedBy: data.updatedBy,
    updatedAt: data.updatedAt,
  };
};