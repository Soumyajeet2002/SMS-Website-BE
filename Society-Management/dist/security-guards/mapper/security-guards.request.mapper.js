"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityGuardsReqMapper = securityGuardsReqMapper;
function securityGuardsReqMapper(mapped) {
    return {
        guardId: mapped.guardId,
        vendorId: mapped.vendorId,
        dateOfBirth: mapped.dateOfBirth,
        gender: mapped.gender,
        emergencyContact: mapped.emergencyContact,
        permanentAddress: mapped.permanentAddress,
        currentAddress: mapped.currentAddress,
        profilePhotoUrl: mapped.profilePhotoUrl,
        idType: mapped.idType,
        idNumber: mapped.idNumber,
        idProofUrl: mapped.idProofUrl,
        joiningDate: mapped.joiningDate,
        employmentType: mapped.employmentType,
        designation: mapped.designation,
        createdBy: mapped.createdBy,
        metadata: mapped.metadata,
        status: mapped.status,
    };
}
//# sourceMappingURL=security-guards.request.mapper.js.map