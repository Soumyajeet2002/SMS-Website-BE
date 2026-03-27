import { ResidentDetails } from './entities/resident-details.entities';
import { CreateResidentMapDto } from './dto/create-resident-details.dto';
import { Repository } from 'typeorm';
export declare class ResidentDetailsService {
    private readonly sqlRepo?;
    private readonly logger;
    constructor(sqlRepo?: Repository<ResidentDetails> | undefined);
    executeByActionType(fn: string, ...args: any[]): any;
    _createSql(data: CreateResidentMapDto, req: any): Promise<{
        message: string;
    }>;
}
