import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VendorStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  BLACKLISTED = 2,
}

@Entity({
  name: 'vendor_details',
  schema: 'society_management',
})
export class VendorDetailsEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'vendor_id' })
  vendorId: string;

  @Column({ name: 'vendor_name', type: 'varchar', length: 150 })
  vendorName: string;

  @Column({ name: 'vendor_type', type: 'varchar', length: 50 })
  vendorType: string;

  @Column({ name: 'email', type: 'varchar', length: 150, nullable: true })
  email: string;

  @Column({ name: 'phone_no', type: 'varchar', length: 20, nullable: true })
  phoneNo: string;

  @Column({
    name: 'vendor_status',
    type: 'smallint',
    default: VendorStatus.ACTIVE,
  })
  vendorStatus: VendorStatus;

  @Column({ name: 'address', type: 'text', nullable: true })
  address: string;

  // ✅ FIXED: JSONB → object
  @Column({ name: 'metadata', type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  // ✅ FIXED timestamps
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @Column({ type: 'uuid' })
  created_by: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ type: 'uuid', nullable: true })
  updated_by: string;
}
