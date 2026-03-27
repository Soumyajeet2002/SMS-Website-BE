import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateSocietySetupDetailsDto } from './create-society-details.dto';




export class UpdateSocietyDetailsDto extends PartialType(CreateSocietySetupDetailsDto) {

  // @ApiPropertyOptional({
  //   description: 'User who updated the amenity',
  //   example: '550e8400-e29b-41d4-a716-446655440000',
  // })

  @IsOptional()
  @IsUUID()
  updatedBy?: string;
}
