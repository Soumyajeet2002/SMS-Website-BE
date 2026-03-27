import { Repository } from 'typeorm';
import { TierCategoryMapEntity } from './entities/amenity-tier-category-map.entities';
import { CreateAmenityTierCategoryMapDto } from './dto/create-amenity-tier-category-map.dto';
import { UpdateAmenityTierCategoryMap } from './dto/update-amenity-tier-category-map.dto';
export declare class TierCategoryMapService {
    private readonly sqlRepo?;
    private readonly logger;
    constructor(sqlRepo?: Repository<TierCategoryMapEntity> | undefined);
    executeByActionType(fn: string, ...args: any[]): any;
    _createSql(data: CreateAmenityTierCategoryMapDto, req: any): Promise<{
        message: string;
    }>;
    _findSql(tierCode?: string): Promise<{
        message: string;
        data: any[];
    }>;
    _findOneSql(id: string): Promise<{
        message: string;
        id: any;
        tierCode: any;
        categoryCode: any;
        displayOrder: any;
        status: any;
    }>;
    _updateSql(data: UpdateAmenityTierCategoryMap, req: any): Promise<{
        message: string;
        updatedCount: number;
    }>;
    _removeSql(id: string): Promise<{
        message: string;
    }>;
}
