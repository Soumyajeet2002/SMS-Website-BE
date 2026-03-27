import { TierCategoryMapService } from './amenity-tier-category-map.service';
import { CreateAmenityTierCategoryMapDto } from './dto/create-amenity-tier-category-map.dto';
import { UpdateAmenityTierCategoryMap } from './dto/update-amenity-tier-category-map.dto';
export declare class TierCategoryMapController {
    private amenityTierCategoryMapService;
    constructor(amenityTierCategoryMapService: TierCategoryMapService);
    createAmenityCatgMap(data: CreateAmenityTierCategoryMapDto, req: any): Promise<any>;
    getCategoryAmenityMap(tierCode?: string): Promise<any>;
    getAmenityCatgMap(id: string): Promise<any>;
    updateAmenityCatgMap(data: UpdateAmenityTierCategoryMap, req: any): Promise<any>;
}
