import { CreateCategoryAmenityMapDto } from './dto/create-category-amenity-map.dto';
import { CategoryAmenityMapService } from './category-amenity-map.service';
import { UpdateCategoryAmenityMapDto } from './dto/update-category-amenity-map.dto';
export declare class CategoryAmenityMapController {
    private categoryamenityService;
    constructor(categoryamenityService: CategoryAmenityMapService);
    createCategoryAmenityMap(data: CreateCategoryAmenityMapDto, req: any): Promise<any>;
    getCategoryAmenityMap(categoryCode?: string): Promise<any>;
    updateCategoryAmenityMap(data: UpdateCategoryAmenityMapDto, req: any): Promise<any>;
}
