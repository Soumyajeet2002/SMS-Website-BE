import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ParkingSlotStatus {
  AVAILABLE = 0,
  OCCUPIED = 1,
  BLOCKED = 2,
}

@Entity({ name: 'parking_slot_mapping', schema: 'society_management' })
export class ParkingSlotEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'slot_id' })
  slotId: string;

  // @Column({ name: 'vehicle_id', type: 'uuid' })
  // vehicleId: string;

  // ✅ NEW: resident instead of vehicle
  @Column({ name: 'resident_uuid', type: 'uuid', nullable: true })
  residentUuid: string | null;

  @Column({ name: 'block_id', type: 'uuid' })
  blockId: string;

  @Column({ name: 'row_no', type: 'varchar', length: 10 })
  rowNo: string;

  @Column({ name: 'column_no', type: 'varchar', length: 10 })
  columnNo: string;

  @Column({
    name: 'status',
    type: 'smallint',
    enum: ParkingSlotStatus,
    default: ParkingSlotStatus.AVAILABLE,
  })
  status: ParkingSlotStatus;

  @Column({ name: 'meta_data', type: 'jsonb', nullable: true })
  metaData: Record<string, any>;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string;
}
