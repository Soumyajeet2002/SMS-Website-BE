import { ApiProperty } from '@nestjs/swagger';

class SlotItemResponseDto {
  @ApiProperty({
    example: 'ed33804f-e6c7-4a50-8f3c-b5489bc340ed',
  })
  slotId: string;

  @ApiProperty({
    example: 'Night Shift',
  })
  slotName: string;
}

export class CreateSlotScheduleResponseDto {
  @ApiProperty({
    example: 'ac33804f-e6c7-4a50-8f3c-b5489bc340ed',
  })
  demoBy: string;

  @ApiProperty({
    example: '2026-01-20',
  })
  slotDate: string;

  @ApiProperty({
    example: 1,
  })
  status: number;

  @ApiProperty({
    type: [SlotItemResponseDto],
  })
  slots: SlotItemResponseDto[];
}
