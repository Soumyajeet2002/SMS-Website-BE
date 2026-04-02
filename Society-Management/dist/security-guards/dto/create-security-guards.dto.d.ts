export declare class CreateSecurityGuardsDto {
    guardId: string;
    vendorId?: string;
    dateOfBirth: string;
    gender: string;
    emergencyContact?: string;
    permanentAddress: string;
    currentAddress?: string;
    profilePhotoUrl?: string;
    idType: string;
    idNumber: string;
    idProofUrl?: string;
    joiningDate: string;
    employmentType: string;
    designation?: string;
    metadata?: Record<string, any>;
    status?: number;
}
