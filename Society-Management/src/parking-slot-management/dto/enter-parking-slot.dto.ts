// import { IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { ParkingSlotStatus } from '../entities/parking-slot-management.entities';
// import { Type } from 'class-transformer';

// export class CreateParkingSlotDto {
//   @ApiProperty({
//     description: 'Vehicle ID associated with the parking slot',
//     example: 'b3f8c7a2-9c1e-4d2a-8b7e-123456789abc',
//   })
//   @IsUUID()
//   vehicleId: string;

//   @ApiProperty({
//     description: 'Block ID where the parking slot is located',
//     example: 'b3f8c7a2-9c1e-4d2a-8b7e-123456789abc',
//   })
//   @IsUUID()
//   blockId: string;

//   @ApiProperty({
//     description: 'Row number of the parking slot',
//     example: 'A1',
//   })
//   @IsString()
//   rowNo: string;

//   @ApiProperty({
//     description: 'Column number of the parking slot',
//     example: '10',
//   })
//   @IsString()
//   columnNo: string;

//   @ApiPropertyOptional({
//     description: 'Status of the parking slot',
//     enum: ParkingSlotStatus,
//     example: ParkingSlotStatus.AVAILABLE,
//   })
//   @IsEnum(ParkingSlotStatus)
//   @IsOptional()
//   status?: ParkingSlotStatus;

//   @IsOptional()
//   @ApiPropertyOptional({
//     description: 'Additional metadata for the parking slot',
//     example: { color: 'red', Type: 'SUV' },
//   })
//   metaData?: Record<string, any>;

//   //   @ApiProperty({
//   //     description: 'User ID who created this record',
//   //     example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
//   //   })
//   //   @IsUUID()
//   //   @IsOptional()
//   //   createdBy: string;
// }

// new nested dto

import {
  IsUUID,
  IsString,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ParkingSlotStatus } from '../entities/parking-slot-management.entities';
import { Type } from 'class-transformer';

export class SlotDto {
  @ApiProperty({
    description: 'Vehicle ID',
    example: 'b3f8c7a2-9c1e-4d2a-8b7e-123456789abc',
  })
  @IsUUID()
  residentUuid: string;

  @ApiProperty({
    description: 'Row number',
    example: 'A1',
  })
  @IsString()
  rowNo: string;

  @ApiProperty({
    description: 'Column number',
    example: '10',
  })
  @IsString()
  columnNo: string;

  @ApiPropertyOptional({
    description: 'Status of slot',
    enum: ParkingSlotStatus,
    example: ParkingSlotStatus.AVAILABLE,
  })
  @IsEnum(ParkingSlotStatus)
  @IsOptional()
  status?: ParkingSlotStatus;

  @ApiPropertyOptional({
    description: 'Additional metadata',
    example: {
      color: 'red',
      Type: 'SUV',
    },
  })
  @IsOptional()
  metaData?: Record<string, any>;
}

export class CreateParkingSlotDto {
  @ApiProperty({
    description: 'Block ID',
    example: 'b3f8c7a2-9c1e-4d2a-8b7e-123456789abc',
  })
  @IsUUID()
  blockId: string;

  @ApiProperty({
    description: 'Slot details',
    type: SlotDto,
  })
  @ValidateNested()
  @Type(() => SlotDto)
  slot: SlotDto;
}
