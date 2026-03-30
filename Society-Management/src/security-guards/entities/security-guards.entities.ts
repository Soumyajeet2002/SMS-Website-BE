import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'society_management', name: 'security_guards' })
export class SecurityGuardsEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'guard_id', type: 'uuid' })
  guardId: string;

  @Column({ name: 'vendor_id', type: 'uuid', nullable: true })
  vendorId: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column({ name: 'gender', type: 'varchar', length: 10 })
  gender: string;

  @Column({ name: 'emergency_contact', type: 'varchar', length: 10, unique: true, nullable: true })
  emergencyContact: string;

  @Column({ name: 'permanent_address', type: 'text' })
  permanentAddress: string;

  @Column({ name: 'current_address', type: 'text', nullable: true })
  currentAddress: string;

  @Column({ name: 'profile_photo_url', type: 'text', nullable: true })
  profilePhotoUrl: string;

  @Column({ name: 'id_type', type: 'varchar', length: 50 })
  idType: string;

  @Column({ name: 'id_number', type: 'varchar', length: 50, unique: true })
  idNumber: string;

  @Column({ name: 'id_proof_url', type: 'text', nullable: true })
  idProofUrl: string;

  @Column({ name: 'police_verification_status', type: 'boolean', default: false })
  policeVerificationStatus: boolean;

  @Column({ name: 'background_check_status', type: 'boolean', default: false })
  backgroundCheckStatus: boolean;

  @Column({ name: 'employee_code', type: 'varchar', length: 50, unique: true, nullable: true })
  employeeCode: string;

  @Column({ name: 'joining_date', type: 'date' })
  joiningDate: Date;

  @Column({ name: 'employment_type', type: 'varchar', length: 20 })
  employmentType: string;

  @Column({ name: 'designation', type: 'varchar', length: 100, nullable: true })
  designation: string;

  @Column({ name: 'status', type: 'smallint', default: 1 })
  status: number;

  @Column({ name: 'metadata', type: 'jsonb', default: () => `'{}'` })
  metadata: Record<string, any>;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt: Date;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy: string;
}
