// // create-vehicle.dto.ts

// import {
//   IsUUID,
//   IsString,
//   IsOptional,
//   IsNumber,
//   IsObject,
// } from 'class-validator';

// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// export class CreateVehicleDto {
//   @ApiProperty({
//     description: 'Unique identifier of the resident who owns the vehicle',
//     example: 'c1b2c3d4-1234-5678-9101-abcdef123456',
//   })
//   @IsOptional()
//   @IsUUID()
//   residentId: string;

//   @ApiProperty({
//     description: 'Type of vehicle (e.g., Car, Bike, Scooter)',
//     example: 'Car',
//   })
//   @IsString()
//   vehicleType: string;

//   @ApiProperty({
//     description: 'Vehicle registration number (number plate)',
//     example: 'OD02AB1234',
//   })
//   @IsString()
//   numberPlate: string;

//   @ApiPropertyOptional({
//     description: 'Model or variant of the vehicle',
//     example: 'Hyundai i20 Sportz',
//   })
//   @IsOptional()
//   @IsString()
//   vehicleModel?: string;

//   @ApiPropertyOptional({
//     description: 'URL of the vehicle image/photo',
//     example: 'https://example.com/vehicle.jpg',
//   })
//   @IsOptional()
//   @IsString()
//   vehiclePhoto?: string;

//   @ApiPropertyOptional({
//     description: 'Fuel type of vehicle (0 = ICE, 1 = EV)',
//     example: 0,
//   })
//   @IsOptional()
//   @IsNumber()
//   fuelType?: number;

//   @ApiPropertyOptional({
//     description: 'Additional metadata related to the vehicle',
//     example: {
//       color: 'white',
//       parkingSlot: 'B12',
//       stickerIssued: true,
//     },
//   })
//   @IsOptional()
//   @IsObject()
//   metaData?: Record<string, any>;
// }

import {
  IsUUID,
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * 🔹 Inner Vehicle Object
 */
class VehicleDto {
  @ApiProperty({
    description: 'Type of vehicle (e.g., Car, Bike, Scooter)',
    example: 'Car',
  })
  @IsString()
  vehicleType: string;

  @ApiProperty({
    description: 'Vehicle registration number (number plate)',
    example: 'OD02AB1234',
  })
  @IsString()
  numberPlate: string;

  @ApiPropertyOptional({
    description: 'Model or variant of the vehicle',
    example: 'Hyundai i20 Sportz',
  })
  @IsOptional()
  @IsString()
  vehicleModel?: string;

  @ApiPropertyOptional({
    description: 'URL of the vehicle image/photo',
    example: 'https://example.com/vehicle.jpg',
  })
  @IsOptional()
  @IsString()
  vehiclePhoto?: string;

  @ApiPropertyOptional({
    description: 'Fuel type of vehicle (0 = ICE, 1 = EV)',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  fuelType?: number;

  @ApiPropertyOptional({
    description: 'Additional metadata related to the vehicle',
    example: {
      color: 'white',
      parkingSlot: 'B12',
      stickerIssued: true,
    },
  })
  @IsOptional()
  @IsObject()
  metaData?: Record<string, any>;
}

/**
 * 🔹 Main Request DTO
 */
// export class CreateVehicleRegistrationDto {
export class CreateVehicleDto {
  @ApiProperty({
    description: 'Unique identifier of the resident',
    example: 'c1b2c3d4-1234-5678-9101-abcdef123456',
  })
  @IsUUID()
  residentId: string;

  @ApiProperty({
    type: [VehicleDto],
    description: 'List of vehicles',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleDto)
  vehicles: VehicleDto[];
}
