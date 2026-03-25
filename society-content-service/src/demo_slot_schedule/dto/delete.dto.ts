import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class DeleteScheduleDto {
  @ApiProperty({
    description: 'Slot date for which all schedules should be deleted',
    example: '2026-05-02',
  })
  @IsString()
  slotDate?: string;

  @ApiProperty({
    description: 'User who created the schedule (used to group schedules)',
    example: 'Aditya Nayak',
  })
  @IsString()
  demoBy?: string;
}
