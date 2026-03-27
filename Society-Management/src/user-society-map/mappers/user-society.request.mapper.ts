export function userSocietyReqMapper(mapped: any) {
    return {
        user_id: mapped.userId,
        society_id: mapped.societyId,
        user_role: mapped.userRole,
        is_active: mapped.isActive,
        created_by: mapped.createdBy
    }
}