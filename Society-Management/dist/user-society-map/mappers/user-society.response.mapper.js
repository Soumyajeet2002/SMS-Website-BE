"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSocietyResponseMapper = userSocietyResponseMapper;
function userSocietyResponseMapper(entity) {
    return {
        id: entity.id,
        userId: entity.user_id,
        societyId: entity.society_id,
        userRole: entity.user_role,
        isActive: entity.is_active
    };
}
;
//# sourceMappingURL=user-society.response.mapper.js.map