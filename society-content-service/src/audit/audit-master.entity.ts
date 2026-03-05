import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'society_master', name: 'master_audit_log' })
export class MasterAuditLog {

  @PrimaryGeneratedColumn('uuid')
  audit_id: string;

  @Column('text')
  table_name: string;

  @Column('uuid')
  record_id: string;

  @Column({ length: 20 })
  action_type: 'CREATE' | 'UPDATE' | 'DELETE';

  @Column({ type: 'jsonb', nullable: true })
  old_data: any;

  @Column({ type: 'jsonb', nullable: true })
  new_data: any;

  @Column('uuid', { nullable: true })
  changed_by: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  changed_at: Date;

  @Column({ type: 'inet', nullable: true })
  ip_address: string | null;

  @Column({ type: 'text', nullable: true })
  platform: string | null;
}
