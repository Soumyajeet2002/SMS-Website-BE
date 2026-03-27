import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocietyAuditLog } from './audit-society.entity';

@Injectable()
export class SocietyAuditService {

  private readonly logger = new Logger(SocietyAuditService.name);

  constructor(
    @InjectRepository(SocietyAuditLog)
    private readonly repo: Repository<SocietyAuditLog>,
  ) {}

  async auditLog(data: {
    recordId: string;
    tableName : any;
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
        table: this.repo.metadata.tableName,
        record: data.recordId,
      });
    }
  }
}
