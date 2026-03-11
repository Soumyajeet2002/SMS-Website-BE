import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SlotStatus } from '../entities/demo-slot.entities';

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

  @ApiProperty({
    description: 'Duration of the slot in minutes',
    example: 60,
  })
  @IsInt()
  @Min(1)
  durationMinutes: number;

  @ApiPropertyOptional({
    description: 'Status of the demo slot (0=Inactive, 1=Active, 2=Deleted)',
    example: SlotStatus.ACTIVE,
    default: SlotStatus.ACTIVE,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2)
  status?: SlotStatus;

  // @ApiPropertyOptional({
  //   description: 'Optional metadata for the demo slot stored as JSON',
  //   example: { trainer: 'TEST', GMEET: 'googlemeetlink' },
  //   type: Object,
  // })
  // @IsOptional()
  // metadata?: Record<string, any>;
}
