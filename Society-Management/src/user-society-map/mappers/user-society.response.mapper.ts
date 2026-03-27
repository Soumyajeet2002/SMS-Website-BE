export function userSocietyResponseMapper(entity: any) {
    return {
        id: entity.id,
        userId: entity.user_id,
        societyId: entity.society_id,
        userRole: entity.user_role,
        isActive: entity.is_active
    };
};
