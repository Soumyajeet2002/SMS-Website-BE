import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { CreateDemoSlotDto } from './create-demo-slot.dto';

export class UpdateDemoSlotDto extends PartialType(CreateDemoSlotDto) {
  @ApiPropertyOptional({
    description: 'User who updated the demo slot',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsOptional()
  updatedBy?: string;
}
