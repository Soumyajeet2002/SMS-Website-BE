"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSocietyAllResponseMapper = userSocietyAllResponseMapper;
function userSocietyAllResponseMapper(entities) {
    if (!entities || !entities.length)
        return [];
    return entities.map(item => ({
        id: item.id,
        userRole: item.userRole,
        userId: item.userId,
        userName: item.userName,
        mobileNumber: item.mobileNumber,
        emailId: item.emailId,
        societyId: item.societyId,
        societyName: item.societyName,
        societyType: item.societyType,
        establishmentYear: item.establishmentYear,
        isActive: item.isActive
    }));
}
//# sourceMappingURL=user-society.getAll.response.js.map