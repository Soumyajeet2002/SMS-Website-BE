import { CreateSocietyFlatListingDto } from './dto/create-society-flat-listing.dto';
import { societyFlatListingEntity } from './entities/society-flat-listing.entity';
import { DataSource, Repository } from 'typeorm';
import { MediaService } from 'src/media/media.service';
import { QueryFlatDto } from './dto/query-flat.dto';
export declare class FlatServiceService {
    private readonly dataSource;
    private mediaService;
    private readonly sqlRepo?;
    private readonly logger;
    constructor(dataSource: DataSource, mediaService: MediaService, sqlRepo?: Repository<societyFlatListingEntity> | undefined);
    executeByDBType(fn: string, ...args: any[]): Promise<any>;
    _createSql(data: CreateSocietyFlatListingDto, req: any): Promise<{
        message: string;
    }>;
    _getAllSql(query: QueryFlatDto): Promise<{
        message: string;
        page: null;
        limit: null;
        total: number;
        totalPages: number;
        data: any;
    } | {
        message: string;
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: any;
    }>;
    _updateSql(data: any, req: any): Promise<{
        message: string;
    }>;
}
