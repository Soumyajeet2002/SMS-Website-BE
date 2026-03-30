import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * Enums for better readability & safety
 */
export enum FuelType {
  ICE = 0,
  EV = 1,
}

export enum VehicleStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  DELETED = 2,
}

@Entity({ name: 'vehicle_registration', schema: 'society_management' })
export class VehicleRegistrationEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'vehicle_id' })
  vehicleId: string;

  @Index()
  @Column({ name: 'resident_id', type: 'uuid' })
  residentId: string;

  @Column({ name: 'vehicle_type', type: 'varchar', length: 50 })
  vehicleType: string;

  @Index({ unique: true })
  @Column({ name: 'number_plate', type: 'varchar', length: 20 })
  numberPlate: string;

  @Column({
    name: 'vehicle_model',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  vehicleModel?: string;

  @Column({ name: 'vehicle_photo', type: 'text', nullable: true })
  vehiclePhoto?: string;

  @Column({
    name: 'fuel_type',
    type: 'smallint',
    enum: FuelType,
    nullable: true,
  })
  fuelType?: FuelType;

  @Index()
  @Column({
    name: 'status',
    type: 'smallint',
    enum: VehicleStatus,
    default: VehicleStatus.ACTIVE,
  })
  status: VehicleStatus;

  @Column({
    name: 'meta_data',
    type: 'jsonb',
    nullable: true,
  })
  metaData?: Record<string, any>;

  /**
   * Audit fields
   */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt?: Date;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;
}
