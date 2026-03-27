import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsNumber,
  IsUUID,
  IsEmail,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BlockDto } from './block.dto';
import { AdminSocietyMapDto } from './admin-society-map.dto';

export class CreateSocietySetupDetailsDto {

  /* =====================================================
     Basic Information
  ===================================================== */

  @ApiProperty({ example: 'Green Valley Residency' })
  @IsString()
  @IsNotEmpty()
  societyName: string;

  @ApiProperty({ example: 'GVR001' })
  @IsString()
  @IsNotEmpty()
  societyCode: string;

  @ApiProperty({ example: 'REG-2025-001' })
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @ApiProperty({ example: 'APARTMENT' })
  @IsString()
  @IsNotEmpty()
  societyType: string;

  @ApiPropertyOptional({ example: 'uuid-value' })
  @IsOptional()
  @IsString()
  societyLevelId?: string;

  @ApiPropertyOptional({ example: 'PREMIUM' })
  @IsOptional()
  @IsString()
  societyLevelCode?: string;

  @ApiPropertyOptional({ example: 2015 })
  @IsOptional()
  @IsInt()
  establishmentYear?: number;

  @ApiPropertyOptional({ example: 12500.75 })
  @IsOptional()
  @IsNumber()
  totalArea?: number;

  /* =====================================================
     Infrastructure (JSONB)
  ===================================================== */

  @ApiProperty({ example: 2 })
  @IsInt()
  numberOfBlocks: number;

  @ApiProperty({
    type: [BlockDto],
    description: 'Block-wise infrastructure details',
  })
  @IsArray()
  @ArrayMinSize(1)
   @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  blocks: BlockDto[];


  /* =====================================================
     Address
  ===================================================== */

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  areaLocality: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  districtCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stateCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pincode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  landmark?: string;

  /* =====================================================
     Admin Info
  ===================================================== */

 @ApiProperty({
    type: [AdminSocietyMapDto],
    description: 'Admin details',
  })
  @IsArray()
  @ArrayMinSize(1)
   @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AdminSocietyMapDto)
  adminDetails: AdminSocietyMapDto[];

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsString()
//   adminName?: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsString()
//   adminMobile?: string;

//   @ApiPropertyOptional()
//   @IsOptional()
//   @IsEmail()
//   adminEmail?: string;

  /* =====================================================
     Package
  ===================================================== */

  @ApiProperty()
  @IsString()
  packageId: string;

  /* =====================================================
     Status
  ===================================================== */

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  status?: number;

  /* =====================================================
     Audit
  ===================================================== */

//   @ApiProperty()
//   @IsUUID()
//   createdBy: string;
}
