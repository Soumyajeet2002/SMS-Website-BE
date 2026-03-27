import { CreateCategoryAmenityMapDto } from './dto/create-category-amenity-map.dto';
import { CategoryAmenityMapEntity } from './entities/category-amenity-map.entities';
import { Repository } from 'typeorm';
import { UpdateCategoryAmenityMapDto } from './dto/update-category-amenity-map.dto';
export declare class CategoryAmenityMapService {
    private readonly sqlRepo?;
    private readonly logger;
    constructor(sqlRepo?: Repository<CategoryAmenityMapEntity> | undefined);
    executeByAction(fnName: string, ...args: any[]): any;
    _createSql(data: CreateCategoryAmenityMapDto, req: any): Promise<{
        message: string;
    }>;
    _findSql(catgCode?: string): Promise<{
        message: string;
        data: any[];
    }>;
    _findOneSql(id: string): Promise<{
        message: string;
        id: any;
        categoryCode: any;
        amenityId: any;
        order: any;
        status: any;
        meta: any;
    }>;
    _updateSql(data: UpdateCategoryAmenityMapDto, req: any): Promise<{
        message: string;
        updatedCount: number;
    }>;
}
