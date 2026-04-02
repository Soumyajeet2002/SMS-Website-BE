import {
  IsUUID,
  IsOptional,
  IsString,
  IsObject,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  FuelType,
  VehicleStatus,
} from '../entities/vehicle_registration.entities';

export class UpdateVehicleDto {
  @ApiProperty({
    description: 'Unique ID of the vehicle',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsOptional()
  vehicleId: string;

  @ApiPropertyOptional({
    description: 'Vehicle number plate',
    example: 'OD02AB1234',
  })
  @IsOptional()
  @IsString()
  numberPlate?: string;

  @ApiPropertyOptional({
    description: 'Type of vehicle',
    example: 'Car',
  })
  @IsOptional()
  @IsString()
  vehicleType?: string;

  @ApiPropertyOptional({
    description: 'Vehicle model',
    example: 'Hyundai i20',
  })
  @IsOptional()
  @IsString()
  vehicleModel?: string;

  @ApiPropertyOptional({
    description: 'Vehicle photo URL',
    example: 'https://example.com/vehicle.jpg',
  })
  @IsOptional()
  @IsString()
  vehiclePhoto?: string;

  // ✅ FIXED: enum instead of string
  @ApiPropertyOptional({
    description: 'Fuel type',
    enum: FuelType,
    example: FuelType.ICE,
  })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  // ✅ FIXED: enum instead of string
  @ApiPropertyOptional({
    description: 'Vehicle status',
    enum: VehicleStatus,
    example: VehicleStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @ApiPropertyOptional({
    description: 'Additional metadata',
    example: { color: 'red', year: 2022 },
    type: Object,
  })
  @IsOptional()
  @IsObject()
  metaData?: Record<string, any>;
}

export class UpdateVehicleBulkDto {
  @ApiProperty({
    description: 'List of vehicles to update',
    type: [UpdateVehicleDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateVehicleDto)
  vehicles: UpdateVehicleDto[];
}
