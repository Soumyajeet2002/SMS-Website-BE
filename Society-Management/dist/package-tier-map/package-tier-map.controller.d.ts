import { PackageTierMapService } from './package-tier-map.service';
import { CreatePackageTierMapDto } from './dto/create-package-tier-map.dto';
import { UpdatePackageTierMapDto } from './dto/update-package-tier-map.dto';
export declare class PackageTierMapController {
    private packageTierService;
    constructor(packageTierService: PackageTierMapService);
    createCategoryAmenityMap(data: CreatePackageTierMapDto, req: any): Promise<any>;
    getCategoryAmenityMap(TierCode?: string): Promise<any>;
    updateCategoryAmenityMap(data: UpdatePackageTierMapDto, req: any): Promise<any>;
}
