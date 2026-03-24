// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity({ name: 'guest_users' })
// export class GuestUserEntity {
//   @PrimaryGeneratedColumn('uuid', { name: 'guest_id' })
//   guestId: string;

//   @Column({ name: 'full_name', length: 150 })
//   fullName: string;

//   @Column({ name: 'mobile_no', length: 20 })
//   mobileNo: string;

//   @Column({ name: 'email', length: 150, nullable: true })
//   email: string;

//   @Column({ name: 'city', length: 100, nullable: true })
//   city: string;

//   @Column({ name: 'project_description', type: 'text', nullable: true })
//   projectDescription: string;

//   @Column({ name: 'source', length: 50, nullable: true })
//   source: string;

//   @Column({ name: 'status', type: 'smallint', default: 1 })
//   status: number;

//   @Column({ name: 'metadata', type: 'jsonb', nullable: true })
//   metadata: Record<string, any>;

//   @Column({ name: 'created_by', type: 'uuid', nullable: true })
//   createdBy: string;

//   @Column({
//     name: 'created_at',
//     type: 'timestamptz',
//     default: () => 'CURRENT_TIMESTAMP',
//   })
//   createdAt: Date;

//   @Column({ name: 'updated_by', type: 'uuid', nullable: true })
//   updatedBy: string;

//   @Column({
//     name: 'updated_at',
//     type: 'timestamptz',
//     nullable: true,
//   })
//   updatedAt: Date;
// }

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
export enum GuestUserStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  DELETED = 2,
}

export enum BookingStatusGuest {
  PENDING = 0,
  BOOKED = 1,
  COMPLETED = 2,
  CANCELLED = 3,
  NO_SHOW = 4,
}

@Entity({ name: 'guest_users', schema: 'society_cms' })
/* Helpful index for filtering */
@Index('idx_guest_users_status', ['status'])
/* Helpful index for searching mobile */
@Index('idx_guest_users_mobile', ['mobileNo'])
/* Helpful index for searching email */
@Index('idx_guest_users_email', ['email'])
export class GuestUserEntity {
  /* Primary Key */

  @PrimaryGeneratedColumn('uuid', { name: 'guest_id' })
  guestId: string;

  /* Business Fields */

  @Column({ name: 'full_name', length: 150 })
  fullName: string;

  @Column({ name: 'mobile_no', length: 20 })
  mobileNo: string;

  @Column({ name: 'email', length: 150, nullable: true })
  email?: string;

  @Column({ name: 'city', length: 100, nullable: true })
  city?: string;

  @Column({ name: 'project_description', type: 'text', nullable: true })
  projectDescription?: string;

  @Column({ name: 'source', length: 50, nullable: true })
  source?: string;

  /**
   * Status Field
   * Replaces isActive + isDeleted
   */
  @Column({
    type: 'smallint',
    default: GuestUserStatus.ACTIVE,
    comment: '0=Inactive, 1=Active, 2=Deleted',
  })
  status: GuestUserStatus;

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
