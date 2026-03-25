import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SlotStatus } from '../entities/demo-slot.entities';
import { DEMO_SLOT_MASTER } from 'src/common/messages/specific.msg';

export class CreateDemoSlotDto {
  @ApiProperty({
    description: 'Name of the demo slot',
    example: 'Morning Slot',
  })
  @IsString()
  @IsNotEmpty()
  slotName: string;

  @ApiProperty({
    description: 'Start time of the demo slot (HH:MM:SS)',
    example: '09:00:00',
  })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    description: 'End time of the demo slot (HH:MM:SS)',
    example: '10:00:00',
  })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiPropertyOptional({
    description: 'Status of the demo slot (0=Inactive, 1=Active, 2=Deleted)',
    example: SlotStatus.ACTIVE,
    default: SlotStatus.ACTIVE,
  })
  @IsOptional()
  @IsInt({ message: DEMO_SLOT_MASTER.ERRORS.SLOT_INTEGER })
  @IsIn([0, 1, 2], { message: DEMO_SLOT_MASTER.ERRORS.SLOT_INVALID })
  status?: SlotStatus;
}
