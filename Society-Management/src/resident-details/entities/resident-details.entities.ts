import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'resident_details',
  schema: 'society_management',
})
export class ResidentDetails {

  @PrimaryGeneratedColumn('uuid')
  resident_uuid: string;

  @Column({ type: 'varchar' })
  member_id: string;
  
  @Column({ type: 'bigint' })
  block_id: number;

  @Column({ type: 'varchar' })
  flat_number: string;

  @Column({ type: 'varchar' })
  owner_type: string;

  @Column({ type: 'date', nullable: true })
  move_in_date: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  emergency_contact: string;

  @Column({ type: 'varchar' })
  id_proof_type: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  id_proof_doc: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profile_pic: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'uuid' })
  created_by: string;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'uuid', nullable: true })
  updated_by: string;
}