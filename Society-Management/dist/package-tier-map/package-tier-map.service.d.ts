import { PackageTierMapEntity } from './entities/package-tier-map.entities';
import { Repository } from 'typeorm';
import { CreatePackageTierMapDto } from './dto/create-package-tier-map.dto';
import { UpdatePackageTierMapDto } from './dto/update-package-tier-map.dto';
export declare class PackageTierMapService {
    private readonly sqlRepo?;
    private readonly logger;
    constructor(sqlRepo?: Repository<PackageTierMapEntity> | undefined);
    executeByAction(fnName: string, ...args: any[]): any;
    _createSql(data: CreatePackageTierMapDto, req: any): Promise<{
        message: string;
    }>;
    _findAllSql(tierCode?: string): Promise<{
        message: string;
        data: any[];
    }>;
    _findOneSql(id: string): Promise<any>;
    _updateSql(data: UpdatePackageTierMapDto, req: any): Promise<{
        message: string;
    }>;
}
