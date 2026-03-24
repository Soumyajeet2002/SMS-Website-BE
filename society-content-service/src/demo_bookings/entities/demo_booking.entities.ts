import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { BookingStatusGuest } from 'src/guest_users/entities/guest-users.entities';

/**
 * Status Convention
 * 0 = Pending
 * 1 = Booked
 * 2 = Completed
 * 3 = Cancelled
 * 4 = No Show
 */
export enum BookingStatus {
  PENDING = 0,
  BOOKED = 1,
  COMPLETED = 2,
  REJECTED = 3,
  NO_SHOW = 4,
}

@Entity({ name: 'demo_bookings', schema: 'society_cms' })
@Index('idx_demo_bookings_guest', ['guestId'])
@Index('idx_demo_bookings_schedule', ['scheduleId'])
export class DemoSlotBookingEntity {
  // Primary Key
  @PrimaryGeneratedColumn('uuid', { name: 'booking_id' })
  bookingId: string;

  // Guest reference
  @Column({ name: 'guest_id', type: 'uuid' })
  guestId: string;

  // Schedule reference
  @Column({ name: 'schedule_id', type: 'uuid' })
  scheduleId: string;

  // Meeting link
  @Column({ name: 'meeting_link', type: 'text', nullable: true })
  meetingLink?: string;

  // // Booking status
  // @Column({
  //   name: 'booking_status',
  //   type: 'smallint',
  //   default: BookingStatus.PENDING,
  //   comment: '0=Pending,1=Booked,2=Completed,3=Cancelled,4=No Show',
  // })
  // bookingStatus: BookingStatus;

  // Booking status Guest
  @Column({
    name: 'booking_status',
    type: 'smallint',
    default: BookingStatus.PENDING,
    comment: '0=Pending,1=Booked,2=Completed,3=Cancelled,4=No Show',
  })
  bookingStatus: BookingStatusGuest;

  // Optional metadata
  @Column({ name: 'metadata', type: 'jsonb', nullable: true, default: '{}' })
  metadata?: Record<string, any>;

  // Audit fields
  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt?: Date;
}
