import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DemoSlotMasterEntity } from '../../demo_slot_master/entities/demo-slot.entities';

/**
 * Status Convention
 * 0 = Inactive
 * 1 = Active
 * 2 = Deleted (Soft Delete)
 */
export enum SlotScheduleStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  DELETED = 2,
}

@Entity({ name: 'demo_slot_schedule', schema: 'society_cms' })
@Index('idx_demo_slot_schedule_date', ['slotDate'])
@Index('idx_demo_slot_schedule_status', ['status'])
export class DemoSlotScheduleEntity {
  // Primary Key
  @PrimaryGeneratedColumn('uuid', { name: 'schedule_id' })
  scheduleId: string;

  // Fields
  @Column({ name: 'slot_date', type: 'date' })
  slotDate: string;

  // @Column({ name: 'person_name', type: 'varchar', length: 255 })
  // personName: string;

  /**
   * Slot Relation
   * Many schedules can belong to one slot
   */
  @ManyToOne(() => DemoSlotMasterEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'slot_id' })
  slot: DemoSlotMasterEntity;

  @Column({ name: 'demo_by', type: 'uuid' })
  demoBy: string;
  /**
   * Status Field
   * Replaces isActive + isDeleted
   */
  @Column({
    type: 'smallint',
    default: SlotScheduleStatus.ACTIVE,
    comment: '0=Inactive, 1=Active, 2=Deleted',
  })
  status: SlotScheduleStatus;

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
