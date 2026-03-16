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

import { SlotScheduleStatus } from '../entities/slot-schedule.entities';

class SlotItemDto {
  @ApiProperty({
    description: 'Slot ID from Demo Slot Master',
    example: 'ed33804f-e6c7-4a50-8f3c-b5489bc340ed',
  })
  @IsUUID()
  @IsNotEmpty()
  slotId: string;

  @ApiPropertyOptional({
    description: 'Slot name (optional)',
    example: 'Night Shift',
  })
  @IsOptional()
  @IsString()
  slotName?: string;
}

export class CreateSlotScheduleDto {
  @ApiProperty({
    description: 'Demo By (User ID)',
    example: 'ed33804f-e6c7-4a50-8f3c-b5489bc340ed',
  })
  @IsUUID()
  @IsNotEmpty()
  demoBy: string;

  @ApiProperty({
    description: 'Date for which the slot is scheduled',
    example: '2026-03-20',
  })
  @IsDateString()
  slotDate: string;

  @ApiProperty({
    description: 'List of slots to schedule',
    type: [SlotItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlotItemDto)
  slots: SlotItemDto[];

  @ApiPropertyOptional({
    description: 'Status of slot schedule (0=Inactive, 1=Active, 2=Deleted)',
    example: SlotScheduleStatus.ACTIVE,
    default: SlotScheduleStatus.ACTIVE,
  })
  @IsOptional()
  @IsInt()
  @IsIn([0, 1, 2])
  status?: SlotScheduleStatus;
}
