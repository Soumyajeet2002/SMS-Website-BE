import { Repository } from 'typeorm';
import { ServicesMasterEntity } from '@sms/db-entities';
export declare class SocietyAdminService {
    private readonly sqlRepo;
    private readonly logger;
    constructor(sqlRepo: Repository<ServicesMasterEntity>);
    executeByActionType(fn: string, ...args: any[]): any;
    _findSql_backup(req: any): Promise<{
        message: string;
        data: {
            societyId: string;
            services: {
                serviceId: any;
                serviceName: any;
                iconUrl: any;
                metaData: any;
                displayOrder: any;
                isAccess: any;
            }[];
        };
    }>;
    _findSql(req: any): Promise<{
        message: string;
        data: {
            societyId: string;
            services: {
                serviceId: any;
                serviceName: any;
                iconUrl: any;
                metaData: any;
                displayOrder: any;
                isAccess: any;
            }[];
        };
    }>;
}
