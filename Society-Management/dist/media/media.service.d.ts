import { mediaEntity } from './entities/media.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class MediaService {
    private readonly sqlRepo;
    private readonly logger;
    constructor(sqlRepo: Repository<mediaEntity>);
    executeByDBType(fn: string, ...args: any[]): Promise<any>;
    _createSql(data: any, req: any, manager?: EntityManager): Promise<{
        message: string;
    }>;
    _getAllSql(): Promise<{
        message: string;
        data: any;
    }>;
    _updateSql(data: any, req: any, manager?: EntityManager): Promise<{
        message: string;
    }>;
}
