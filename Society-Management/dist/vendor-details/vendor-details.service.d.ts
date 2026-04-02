import { Repository } from 'typeorm';
import { VendorDetailsEntity } from './entities/vendor-details.entities';
import { CreateVendorDetailsDto } from './dto/create-vendor-details.dto';
import { GetVendorQueryDto } from './dto/fetch-vendor-details.dto';
import { UpdateVendorDto } from './dto/update-vendor-details.dto';
export declare class VendorDetailsService {
    private readonly vendorRepo;
    private readonly logger;
    constructor(vendorRepo: Repository<VendorDetailsEntity>);
    executeByActionType(fn: string, ...args: any[]): any;
    _createSql(data: CreateVendorDetailsDto, req: any): Promise<{
        message: string;
        vendor: {
            vendorId: any;
            societyId: any;
            name: any;
            type: any;
            status: any;
            email: any;
            phone: any;
            createdAt: any;
            createdBy: any;
        };
    }>;
    _getAllVendors(query: GetVendorQueryDto): Promise<{
        message: string;
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: VendorDetailsEntity[];
    }>;
    _updateVendor(vendorId: string, data: UpdateVendorDto, updatedBy: string, req: any): Promise<{
        message: string;
        data: VendorDetailsEntity;
    }>;
    _deleteVendor(vendorId: string, updatedBy: string): Promise<{
        message: string;
    }>;
}
