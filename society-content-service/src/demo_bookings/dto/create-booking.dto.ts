import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsInt,
  IsIn,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BookingStatus } from '../entities/demo_booking.entities';

class BookingItemDto {
  @ApiProperty({
    description: 'Slot ID from Demo Slot Master (optional, for reference)',
    example: 'ed33804f-e6c7-4a50-8f3c-b5489bc340ed',
  })
  @IsOptional()
  @IsUUID()
  slotId?: string;

  // @ApiProperty({
  //   description: 'Schedule ID from Demo Schedule Master',
  //   example: '065858ff-2ce7-44e6-956d-cde62f148624',
  // })
  // @IsUUID()
  // @IsNotEmpty()
  // scheduleId: string;

  @ApiProperty({
    description: 'Guest User ID',
    example: '08bb9e12-a427-46b0-8f7b-8e7018b6292e',
  })
  @IsUUID()
  @IsNotEmpty()
  guestId: string;

  @ApiPropertyOptional({
    description: 'Meeting link for the booking',
    example: 'https://meet.google.com/abc-xyz',
  })
  @IsOptional()
  @IsString()
  meetingLink?: string;

  @ApiPropertyOptional({
    description: 'Additional metadata for booking',
    example: { note: 'Client prefers evening slot' },
  })
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({
    description:
      'Booking status (0=Pending, 1=Booked, 2=Completed, 3=Cancelled, 4=No Show)',
    example: BookingStatus.BOOKED,
    default: BookingStatus.PENDING,
  })
  @IsOptional()
  @IsInt()
  @IsIn([0, 1, 2, 3, 4])
  bookingStatus?: BookingStatus;
}

export class CreateSlotBookingDto {
  @ApiProperty({
    description: 'Demo By (User ID)',
    example: 'ed33804f-e6c7-4a50-8f3c-b5489bc340ed',
  })
  @IsUUID()
  @IsNotEmpty()
  demoBy: string;

  @ApiProperty({
    description: 'Date for which booking is requested',
    example: '2026-03-20',
  })
  @IsDateString()
  slotDate: string;

  @ApiProperty({
    description: 'List of bookings to create',
    type: [BookingItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingItemDto)
  bookings: BookingItemDto[];

  // @ApiPropertyOptional({
  //   description:
  //     'Default booking status if not provided per item (0=Pending, 1=Booked, 2=Completed)',
  //   example: BookingStatus.BOOKED,
  //   default: BookingStatus.BOOKED,
  // })
  // @IsOptional()
  // @IsInt()
  // @IsIn([0, 1, 2])
  // status?: BookingStatus;
}
