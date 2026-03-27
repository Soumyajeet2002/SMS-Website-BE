import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'society_management', name: 'society_audit_log' })
export class SocietyAuditLog {

  @PrimaryGeneratedColumn('uuid')
  audit_id: string;

  @Column({ type: 'text' })
  table_name: string;

  @Column({ type: 'uuid' })
  record_id: string;

  @Column({ type: 'varchar', length: 20 })
  action_type: 'CREATE' | 'UPDATE' | 'DELETE';

  @Column({ type: 'jsonb', nullable: true })
  old_data: any;

  @Column({ type: 'jsonb', nullable: true })
  new_data: any;

  @Column({ type: 'uuid', nullable: true })
  changed_by: string | null;;

  @CreateDateColumn({ type: 'timestamptz' })
  changed_at: Date;

  @Column({ type: 'inet', nullable: true })
  ip_address: string | null;;

  @Column({ type: 'text', nullable: true })
  platform: string | null;;
}
