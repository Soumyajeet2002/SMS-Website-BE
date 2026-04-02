export declare class SecurityGuardsEntity {
    id: string;
    guardId: string;
    vendorId: string;
    dateOfBirth: Date;
    gender: string;
    emergencyContact: string;
    permanentAddress: string;
    currentAddress: string;
    profilePhotoUrl: string;
    idType: string;
    idNumber: string;
    idProofUrl: string;
    policeVerificationStatus: boolean;
    backgroundCheckStatus: boolean;
    employeeCode: string;
    joiningDate: Date;
    employmentType: string;
    designation: string;
    status: number;
    metadata: Record<string, any>;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}
