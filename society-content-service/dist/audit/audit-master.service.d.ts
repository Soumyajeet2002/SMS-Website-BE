import { MasterAuditLog } from "./audit-master.entity";
import { Repository } from "typeorm";
export declare class MasterAuditService {
    private readonly repo;
    private readonly logger;
    constructor(repo: Repository<MasterAuditLog>);
    auditLog(data: {
        tableName: string;
        recordId: string;
        action: 'CREATE' | 'UPDATE' | 'DELETE';
        oldData?: any;
        newData?: any;
        changedBy?: string;
        ipAddress?: string;
        platform?: string;
    }): Promise<void>;
}
