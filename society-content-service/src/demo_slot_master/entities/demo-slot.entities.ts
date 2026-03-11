import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * Status Convention
 * 0 = Inactive
 * 1 = Active
 * 2 = Deleted (Soft Delete)
 */
export enum SlotStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  DELETED = 2,
}

@Entity({ name: 'demo_slot_master', schema: 'society_cms' })
@Index('idx_demo_slot_status', ['status'])
export class DemoSlotMasterEntity {
  // Primary Key
  @PrimaryGeneratedColumn('uuid', { name: 'slot_id' })
  slotId: string;

  // Fields
  @Column({ name: 'slot_name', type: 'time' })
  slotName: string;

  @Column({ name: 'start_time', type: 'time' })
  startTime: string; // using string because time without timezone is usually stored as 'HH:MM:SS'

  @Column({ name: 'end_time', type: 'time' })
  endTime: string;

  @Column({ name: 'duration_minutes', type: 'int' })
  durationMinutes: number;

  /**
   * Status Field
   * Replaces isActive + isDeleted
   */
  @Column({
    type: 'smallint',
    default: SlotStatus.ACTIVE,
    comment: '0=Inactive, 1=Active, 2=Deleted',
  })
  status: SlotStatus;

  /* Optional JSON Metadata */
  @Column({ name: 'metadata', type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  /* Audit Fields */
  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt?: Date;
}
