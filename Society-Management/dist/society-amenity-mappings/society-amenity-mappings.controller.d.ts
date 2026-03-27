import { SocietyAmenityMappingsService } from './society-amenity-mappings.service';
import { CreateSocietyAmenityMapDto } from './dto/create-society-amenity-map.dto';
import { SocietyIdDto } from './dto/get-by-societyId.dto';
export declare class SocietyAmenityMappingsController {
    private societyAmenityMapService;
    constructor(societyAmenityMapService: SocietyAmenityMappingsService);
    createCSocietyAmenityMap(data: CreateSocietyAmenityMapDto, req: any): Promise<any>;
    getBySocietyId(body: SocietyIdDto): Promise<any>;
}
