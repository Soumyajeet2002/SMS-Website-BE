"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.societyDetailsResponseMapper = void 0;
const societyDetailsResponseMapper = (data) => {
    if (!data)
        return null;
    return {
        societyId: data.societyId,
        societyName: data.societyName,
        societyCode: data.societyCode,
        registrationNumber: data.registrationNumber,
        societyType: data.societyType,
        societyLevel: data.societyLevelCode,
        establishmentYear: data.establishmentYear,
        totalArea: data.totalArea,
        blocks: data.blocks?.map((block) => ({
            blockName: block.blockName,
            numberOfFloors: block.totalFloors,
            totalFlats: block.totalFlats,
            parkingSlots: block.parkingSlot ?? null,
            blockCode: block.blockCode,
            blockId: block.blockId,
        })) ?? [],
        adminDetails: data.admins?.map((admin) => ({
            userId: admin.user_id,
            roleName: admin.user_role,
            roleId: admin.user?.role_unq_id,
            name: admin.user?.name ?? null,
            email: admin.user?.email ?? null,
            mobile: admin.user?.mobile ?? null,
        })) ?? [],
        addressLine1: data.addressLine1,
        areaLocality: data.areaLocality,
        city: data.city,
        districtCode: data.districtCode,
        stateCode: data.stateCode,
        pincode: data.pincode,
        landmark: data.landmark,
        packageId: data.packageId,
        status: data.status,
        onboardingDate: data.onboardingDate,
        isDeleted: data.isDeleted,
        createdBy: data.createdBy,
        createdAt: data.createdAt,
        updatedBy: data.updatedBy,
        updatedAt: data.updatedAt,
    };
};
exports.societyDetailsResponseMapper = societyDetailsResponseMapper;
//# sourceMappingURL=society-details.response.mapper.js.map