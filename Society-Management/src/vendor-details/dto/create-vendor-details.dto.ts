import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsUUID,
  IsEmail,
  IsObject,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVendorDetailsDto {
  /* ===================================================== */
  @ApiProperty({ example: 'ABC Security Services' })
  @IsString()
  @IsNotEmpty()
  vendorName: string;

  // @ApiProperty({ example: ' 6bf529ea-17e9-4b0e-bb62-beb224b04678' })
  // @IsString()
  // @IsNotEmpty()
  // societyId: string;

  @ApiProperty({ example: 'guard_agency' })
  @IsString()
  @IsNotEmpty()
  vendorType: string;

  @ApiPropertyOptional({ example: 'abc@security.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '9876543210' })
  @IsOptional()
  @IsString()
  phoneNo?: string;

  /* ===================================================== */
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(2)
  vendorStatus?: number;

  /* ===================================================== */
  @ApiPropertyOptional({ example: 'Bhubaneswar, Odisha' })
  @IsOptional()
  @IsString()
  address?: string;

  /* ===================================================== */
  @ApiPropertyOptional({
    example: { guards: 10, shift: 'night' },
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
