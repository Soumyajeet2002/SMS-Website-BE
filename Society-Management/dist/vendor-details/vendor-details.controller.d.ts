import { VendorDetailsService } from './vendor-details.service';
import { CreateVendorDetailsDto } from './dto/create-vendor-details.dto';
import type { Request } from 'express';
import { GetVendorQueryDto } from './dto/fetch-vendor-details.dto';
import { UpdateVendorDto } from './dto/update-vendor-details.dto';
export declare class VendorDetailsController {
    private readonly vendorDetailsService;
    constructor(vendorDetailsService: VendorDetailsService);
    create(dto: CreateVendorDetailsDto, req: Request): any;
    getAllVendors(query: GetVendorQueryDto): Promise<any>;
    updateVendor(vendorId: string, data: UpdateVendorDto): Promise<any>;
    deleteVendor(vendorId: string): Promise<any>;
}
