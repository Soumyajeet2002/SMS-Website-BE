"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestUserGetAllResMapperSql = void 0;
const guestUserGetAllResMapperSql = (data, bookingMap) => {
    return {
        guest_Id: data.guestId,
        full_Name: data.fullName,
        mobile_No: data.mobileNo,
        email: data.email,
        city: data.city,
        projectDescription: data.projectDescription,
        source: data.source,
        status: data.status,
        bookingStatus: bookingMap?.get(data.guestId) ?? 0,
        metadata: data.metadata,
    };
};
exports.guestUserGetAllResMapperSql = guestUserGetAllResMapperSql;
//# sourceMappingURL=guest-user.getAllresponse.mapper.js.map