import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsIn,
  IsOptional,
  IsUUID,
  ValidateNested,
  ArrayNotEmpty,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SlotScheduleStatus } from '../entities/slot-schedule.entities';

class SlotUpdateDto {
  @ApiPropertyOptional({
    description: 'Slot ID',
    example: 'c195152b-8b85-4286-aedb-6746b3451d7e',
  })
  @IsUUID()
  slotId: string;

  @ApiPropertyOptional({
    description: 'Slot Name',
    example: 'Evening Slot -1',
  })
  @IsOptional()
  @IsString()
  slotName?: string;

  @ApiPropertyOptional({
    description: 'Status of the slot',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  status?: number;
}

export class UpdateSlotScheduleDto {
  @ApiPropertyOptional({
    description: 'Demo by user ID',
    example: '18877320-c822-4123-bda4-cbe97543f1db',
  })
  @IsOptional()
  @IsUUID()
  demoBy?: string;

  @ApiPropertyOptional({
    description: 'Slot Date (optional)',
    example: '2026-04-29',
  })
  @IsOptional()
  @IsString()
  slotDate?: string;

  @ApiPropertyOptional({
    description: 'Slots to update (add/remove/update)',
    type: [SlotUpdateDto],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SlotUpdateDto)
  @ArrayNotEmpty()
  slots?: SlotUpdateDto[];

  @ApiPropertyOptional({
    description: 'Status of slot schedule',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @IsIn([0, 1, 2])
  status?: SlotScheduleStatus;
}
