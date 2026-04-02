import { CreateUserSocietyMapDto } from './dto/create-user-society-map.dto';
import { UpdateUserSocietyMapDto } from './dto/update-user-society-map.dto';
import { UserSocietyMapEntity } from './entities/user-society-map.entities';
import { Repository } from 'typeorm';
export declare class UserSocietyMapService {
    private readonly sqlRepo?;
    private readonly logger;
    constructor(sqlRepo?: Repository<UserSocietyMapEntity> | undefined);
    executeByActionType(fn: string, ...args: any[]): any;
    _createSql(data: CreateUserSocietyMapDto, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    _findOne(id: string): Promise<{
        message: string;
        id: any;
        userId: any;
        societyId: any;
        userRole: any;
        isActive: any;
    }>;
    _findSql(body: {
        userId?: string;
        societyId?: string;
    }): Promise<any>;
    _findAllSql(): Promise<{
        data: {
            id: any;
            userRole: any;
            userId: any;
            userName: any;
            mobileNumber: any;
            emailId: any;
            societyId: any;
            societyName: any;
            societyType: any;
            establishmentYear: any;
            isActive: any;
        }[];
        message: string;
    }>;
    _updateSql(id: string, data: UpdateUserSocietyMapDto, req: any): Promise<{
        success: boolean;
        message: string;
        id: any;
        userId: any;
        societyId: any;
        userRole: any;
        isActive: any;
    }>;
    _removeSql(id: string): Promise<{
        message: string;
    }>;
}
