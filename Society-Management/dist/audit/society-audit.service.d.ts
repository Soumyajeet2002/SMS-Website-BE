import { Repository } from 'typeorm';
import { SocietyAuditLog } from './audit-society.entity';
export declare class SocietyAuditService {
    private readonly repo;
    private readonly logger;
    constructor(repo: Repository<SocietyAuditLog>);
    auditLog(data: {
        recordId: string;
        tableName: any;
        action: 'CREATE' | 'UPDATE' | 'DELETE';
        oldData?: any;
        newData?: any;
        changedBy?: string;
        ipAddress?: string;
        platform?: string;
    }): Promise<void>;
}
