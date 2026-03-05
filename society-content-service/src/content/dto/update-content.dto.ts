import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { CreateContentDto } from './create-content.dto';

export class UpdateContentDto extends PartialType(CreateContentDto) {
  @ApiPropertyOptional({
    description: 'User who updated the content',
    example: '550e8400-e29b-41d4-a716-446655440000',

    // The description and example are kept as swagger documentation.
  })
  @IsUUID()
  @IsOptional()
  updatedBy?: string;
}
