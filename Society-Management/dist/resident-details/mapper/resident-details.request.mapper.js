"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.residentDetailsReqMapper = residentDetailsReqMapper;
function residentDetailsReqMapper(mapped) {
    return {
        resident_uuid: mapped.residentId,
        block_id: mapped.blockId,
        flat_number: mapped.flatNumber,
        owner_type: mapped.ownerType,
        move_in_date: mapped.moveInDate,
        emergency_contact: mapped.emergencyContact,
        id_proof_type: mapped.idProofType,
        id_proof_doc: mapped.idProofDoc,
        profile_pic: mapped.profilePic
    };
}
//# sourceMappingURL=resident-details.request.mapper.js.map