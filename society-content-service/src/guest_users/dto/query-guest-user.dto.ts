import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumberString,
  IsIn,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

import { BookingStatus } from '../../demo_bookings/entities/demo_booking.entities';

export class QueryGuestUserDto {
  @ApiPropertyOptional({
    description: 'Search guest users by full name, email, or mobile number',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({
    description: 'Limit per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Sort by field',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';

  @ApiPropertyOptional({
    description: 'search with booking status',
    example: '1',
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(BookingStatus)
  bookingStatus?: BookingStatus;
}
