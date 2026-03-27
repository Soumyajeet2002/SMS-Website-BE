"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSocietyReqMapper = userSocietyReqMapper;
function userSocietyReqMapper(mapped) {
    return {
        user_id: mapped.userId,
        society_id: mapped.societyId,
        user_role: mapped.userRole,
        is_active: mapped.isActive,
        created_by: mapped.createdBy
    };
}
//# sourceMappingURL=user-society.request.mapper.js.map