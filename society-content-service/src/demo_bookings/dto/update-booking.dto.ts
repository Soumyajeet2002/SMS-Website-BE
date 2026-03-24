import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEnum,
  IsString,
} from 'class-validator';
import { BookingStatus } from '../entities/demo_booking.entities';

export class UpdateBookingDto {
  @ApiProperty({
    description: 'Guest ID for booking',
    example: '3f9c7939-7196-4797-8dfb-5b302504089f',
  })
  @IsUUID()
  @IsNotEmpty()
  guestId: string;

  @ApiProperty({
    description: 'DemoBy user ID',
    example: '18877320-c822-4123-bda4-cbe97543f1db',
  })
  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  demoBy?: string;

  @ApiProperty({
    description: 'Slot date (YYYY-MM-DD)',
    example: '2026-01-02',
  })
  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  slotDate: string;

  @ApiProperty({
    description: 'Slot ID',
    example: '07e342c2-d585-4215-bfcf-eab87bb610cc',
  })
  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  slotId: string;

  @ApiProperty({
    description: 'Booking status',
    enum: BookingStatus,
    example: BookingStatus.BOOKED,
    required: false,
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  bookingStatus?: BookingStatus;
}
