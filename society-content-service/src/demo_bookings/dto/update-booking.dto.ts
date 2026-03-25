import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsString,
  IsObject,
} from 'class-validator';
import { BookingStatus } from '../entities/demo_booking.entities';

export class UpdateBookingDto {
  @ApiProperty({
    description: 'Guest ID for booking',
    example: '45918264-4333-4ed4-8bda-a3040f3f0c62',
  })
  // @IsUUID()
  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  guestId: string;

  @ApiProperty({
    description: 'Schedule ID for booking',
    example: '31589428-512d-4d0a-9d00-7ae5a1b03463',
  })
  // @IsUUID()
  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  scheduleId: string | null;

  @ApiProperty({
    description:
      'Booking status (0=Pending,1=Booked,2=Completed,3=Rejected,4=No Show)',
    enum: BookingStatus,
    example: BookingStatus.BOOKED,
    required: false,
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  bookingStatus?: BookingStatus;

  @ApiProperty({
    description: 'Meeting link for the booking',
    example: 'https://meet.google.com/abc-xyz',
    required: false,
  })
  @IsOptional()
  @IsString()
  meetingLink?: string;

  @ApiProperty({
    description: 'Additional metadata for booking',
    example: 'Client prefers evening slot',
    required: false,
  })
  @IsOptional()
  @IsString()
  metadata?: string;
}
