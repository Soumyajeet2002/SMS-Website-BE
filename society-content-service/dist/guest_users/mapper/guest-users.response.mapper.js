"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestUserResMapperSql = void 0;
const guestUserResMapperSql = (data, bookingStatus) => {
    return {
        guest_Id: data.guestId,
        full_Name: data.fullName,
        mobile_No: data.mobileNo,
        email: data.email,
        city: data.city,
        projectDescription: data.projectDescription,
        source: data.source,
        status: data.status,
        bookingStatus: bookingStatus,
        metadata: data.metadata,
    };
};
exports.guestUserResMapperSql = guestUserResMapperSql;
//# sourceMappingURL=guest-users.response.mapper.js.map