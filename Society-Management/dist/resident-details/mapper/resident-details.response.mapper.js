"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.residentDetailsResMapper = void 0;
const residentDetailsResMapper = (data) => {
    if (!data)
        return null;
    return {
        residentId: data.resident_uuid,
        mobile: data.mobile,
        name: data.name,
        email: data.email,
        memberId: data.member_id,
        blockId: data.block_id,
        flatNumber: data.flat_number,
        ownerType: data.owner_type,
        moveInDate: data.move_in_date,
        emergencyContact: data.emergency_contact,
        idProofType: data.id_proof_type,
        idProofDoc: data.id_proof_doc,
        profilePic: data.profile_pic,
        userSocietyMappedId: data.id,
        societyId: data.society_id,
        status: data.status
    };
};
exports.residentDetailsResMapper = residentDetailsResMapper;
//# sourceMappingURL=resident-details.response.mapper.js.map