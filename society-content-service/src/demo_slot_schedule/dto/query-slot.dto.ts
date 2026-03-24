import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsUUID,
  IsString,
  IsNumber,
  IsIn,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SlotScheduleStatus } from '../entities/slot-schedule.entities';

export class GetScheduleQueryDto {
  @ApiPropertyOptional({
    description: 'Filter schedules by demoBy (UUID or name)',
    example: 'Gyana or c3f7c1c0-9b0d-4c9b-9b9a-123456789abc',
  })
  @IsOptional()
  @IsString()
  demoBy?: string;

  @ApiPropertyOptional({
    description: 'Search schedules by keyword',
    example: 'Morning',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by schedule date',
    example: '2026-03-12',
  })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of records per page',
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Sort by field',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({
    description: 'Status of slot schedule [0=Inactive, 1=Active, 2=Deleted]',
    example: 1,
  })
  @IsOptional()
  status?: SlotScheduleStatus;
}
