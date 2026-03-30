export function securityGuardsReqMapper(mapped: any) {
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