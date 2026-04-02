import { DataSource } from 'typeorm';
import { ResidentDetails } from './entities/resident-details.entities';
import { CreateResidentMapDto } from './dto/create-resident-details.dto';
import { Repository } from 'typeorm';
export declare class ResidentDetailsService {
    private readonly sqlRepo;
    private readonly dataSource;
    private readonly logger;
    constructor(sqlRepo: Repository<ResidentDetails>, dataSource: DataSource);
    executeByActionType(fn: string, ...args: any[]): any;
    _createSql(data: CreateResidentMapDto, req: any): Promise<{
        message: string;
    }>;
    _updateSql(data: CreateResidentMapDto, req: any): Promise<{
        message: string;
        residentId?: any;
        mobile?: any;
        name?: any;
        email?: any;
        memberId?: any;
        blockId?: any;
        flatNumber?: any;
        ownerType?: any;
        moveInDate?: any;
        emergencyContact?: any;
        idProofType?: any;
        idProofDoc?: any;
        profilePic?: any;
        userSocietyMappedId?: any;
        societyId?: any;
        status?: any;
    }>;
    _getByIdSql(residentId: string): Promise<{
        message: string;
        residentId?: any;
        mobile?: any;
        name?: any;
        email?: any;
        memberId?: any;
        blockId?: any;
        flatNumber?: any;
        ownerType?: any;
        moveInDate?: any;
        emergencyContact?: any;
        idProofType?: any;
        idProofDoc?: any;
        profilePic?: any;
        userSocietyMappedId?: any;
        societyId?: any;
        status?: any;
    }>;
    _getAll(query: any): Promise<{
        data: any;
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        message: string;
    }>;
    _findOne(residentId: string): Promise<{
        residentDetails: ResidentDetails;
        message: string;
    }>;
}
