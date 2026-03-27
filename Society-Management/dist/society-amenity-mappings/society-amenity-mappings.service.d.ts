import { SocietyAmenityMappingsEntity } from './entities/society-amenity-map.entities';
import { Repository } from 'typeorm';
import { CreateSocietyAmenityMapDto } from './dto/create-society-amenity-map.dto';
export declare class SocietyAmenityMappingsService {
    private readonly sqlRepo?;
    private readonly logger;
    constructor(sqlRepo?: Repository<SocietyAmenityMappingsEntity> | undefined);
    executeByAction(fnName: string, ...args: any[]): any;
    _createSql(data: CreateSocietyAmenityMapDto, req: any): Promise<{
        message: string;
    }>;
    _findSql(societyId?: string): Promise<{
        societyId?: undefined;
        societyName?: undefined;
        categoryDetails?: undefined;
        message: string;
    } | {
        societyId: any;
        societyName: any;
        categoryDetails: any[];
        message: string;
    }>;
}
