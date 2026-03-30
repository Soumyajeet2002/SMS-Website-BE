import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class QueryResidentDto {
  
  @ApiPropertyOptional({
    description: 'Search by name, mobile, or email',
    example: 'Raj',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by owner type',
    example: 'OWNER',
  })
  @IsOptional()
  @IsString()
  ownerType?: string;

  @ApiPropertyOptional({
    description: 'Filter by user status',
    example: 'ACTIVE',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({
    description: 'Limit per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsNumberString()
  limit?: number;
}