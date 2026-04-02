import { VendorStatus } from '../entities/vendor-details.entities';
export declare class UpdateVendorDto {
    vendorName: string;
    vendorType: string;
    email: string;
    phoneNo: string;
    vendorStatus: VendorStatus;
    address: string;
    metadata?: Record<string, any>;
}
