export declare enum VendorStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    BLACKLISTED = 2
}
export declare class VendorDetailsEntity {
    vendorId: string;
    vendorName: string;
    vendorType: string;
    email: string;
    phoneNo: string;
    vendorStatus: VendorStatus;
    address: string;
    metadata: Record<string, any>;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}
