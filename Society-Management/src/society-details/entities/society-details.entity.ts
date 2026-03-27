import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { SocietyBlockEntity } from './society-block.entity';

@Entity({
  schema: 'society_management',
  name: 'society_setup_details',
})
export class SocietySetupDetailsEntity {

  /* =====================================================
     Primary Key
  ===================================================== */

  @PrimaryGeneratedColumn('uuid', { name: 'society_id' })
  societyId: string;

  /* =====================================================
     Basic Information
  ===================================================== */

  @Column({ name: 'society_name', length: 150 })
  societyName: string;

  @Column({ name: 'society_code', length: 50, unique: true })
  societyCode: string;

  @Column({ name: 'registration_number', length: 100, unique: true })
  registrationNumber: string;

  @Column({ name: 'society_type', length: 50 })
  societyType: string;

  @Column({ name: 'society_level_id', type: 'uuid', nullable: true })
  societyLevelId?: string;

  @Column({ name: 'society_level_code', length: 20, nullable: true })
  societyLevelCode?: string;

  @Column({ name: 'establishment_year', type: 'int', nullable: true })
  establishmentYear?: number;

  @Column({
    name: 'total_area',
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  totalArea?: number;

  /* =====================================================
     Infrastructure (JSONB)
  ===================================================== */

  @Column({
    name: 'infrastructure_details',
    type: 'jsonb',
    default: () => "'{}'",
  })
  infrastructureDetails: {
    numberOfBlocks?: number;
    blocks?: any[];
  };

  @OneToMany(
  () => SocietyBlockEntity,
  (block) => block.society,
)
blocks: SocietyBlockEntity[];

  /* =====================================================
     Address
  ===================================================== */

  @Column({ name: 'address_line1', type: 'text' })
  addressLine1: string;

  @Column({ name: 'area_locality', length: 150 })
  areaLocality: string;

  @Column({ name: 'city', length: 100 })
  city: string;

  @Column({ name: 'district_code', length: 50 })
  districtCode: string;

  @Column({ name: 'state_code', length: 50 })
  stateCode: string;

  @Column({ name: 'pincode', length: 10 })
  pincode: string;

  @Column({ name: 'landmark', length: 150, nullable: true })
  landmark?: string;

  /* =====================================================
     Admin Info
  ===================================================== */

  @Column({ name: 'admin_name', length: 150, nullable: true })
  adminName?: string;

  @Column({ name: 'admin_mobile', length: 15, nullable: true })
  adminMobile?: string;

  @Column({ name: 'admin_email', length: 150, nullable: true })
  adminEmail?: string;

  /* =====================================================
     Package
  ===================================================== */

  @Column({ name: 'package_id', type: 'uuid' })
  packageId: string;

  /* =====================================================
     Status
  ===================================================== */

  @Column({
    name: 'status',
    type: 'smallint',
    default: 1,
  })
  status: number;

  @Column({
    name: 'onboarding_date',
    type: 'timestamptz',
    default: () => 'now()',
  })
  onboardingDate: Date;

  /* =====================================================
     Audit Fields
  ===================================================== */

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;

  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
  })
  updatedAt?: Date;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;
}
