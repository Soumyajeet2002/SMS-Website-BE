// get-vehicle-query.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsUUID,
  IsString,
  IsNumber,
  IsIn,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

import {
  VehicleStatus,
  FuelType,
} from '../entities/vehicle_registration.entities';

export class GetVehicleQueryDto {
  @ApiPropertyOptional({
    description: 'Filter vehicles by residentId',
    example: 'c1b2c3d4-1234-5678-9101-abcdef123456',
  })
  @IsOptional()
  @IsUUID()
  residentId?: string;

  @ApiPropertyOptional({
    description: 'Search by vehicle type, model, or number plate',
    example: 'OD02AB1234',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by vehicle type',
    example: 'Car',
  })
  @IsOptional()
  @IsString()
  vehicleType?: string;

  @ApiPropertyOptional({
    description: 'Filter by fuel type (0 = ICE, 1 = EV)',
    example: 0,
  })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of records per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Sort by field',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({
    description: 'Status of vehicle [0=Inactive, 1=Active]',
    example: 1,
  })
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;
}
