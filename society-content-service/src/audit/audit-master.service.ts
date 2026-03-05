import { InjectRepository } from "@nestjs/typeorm";
import { MasterAuditLog } from "./audit-master.entity";
import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class MasterAuditService {
 private readonly logger = new Logger(MasterAuditService.name);
  constructor(
    @InjectRepository(MasterAuditLog)
    private readonly repo: Repository<MasterAuditLog>,

  ) {}

  async auditLog(data: {
    tableName: string;
    recordId: string;

    action: 'CREATE' | 'UPDATE' | 'DELETE';

    oldData?: any;
    newData?: any;

    changedBy?: string;
    ipAddress?: string;
    platform?: string;
  }) {

    try {

      await this.repo.insert({

        table_name: data.tableName,
        record_id: data.recordId,

        action_type: data.action,

        old_data: data.oldData ?? null,
        new_data: data.newData ?? null,

        changed_by: data.changedBy || null,

        ip_address: data.ipAddress || null,
        platform: data.platform || null,
      });

    } catch (err) {

     
      this.logger.warn('Master audit failed', {
        error: err.message,
        table: data.tableName,
        record: data.recordId,
      });
    }
  }
}
