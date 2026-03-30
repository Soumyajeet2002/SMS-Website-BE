import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsObject,
  IsNumber,
} from 'class-validator';
import { VendorStatus } from '../entities/vendor-details.entities';

export class UpdateVendorDto {
  @ApiProperty({ description: 'Vendor Name', maxLength: 150 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  vendorName: string;

  @ApiProperty({ description: 'Vendor Type', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  vendorType: string;

  @ApiProperty({ description: 'Vendor Email', example: 'vendor@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  email: string;

  @ApiProperty({ description: 'Vendor Phone Number', maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phoneNo: string;

  @ApiProperty({
    description: 'Vendor Status (0=Inactive,1=Active,2=Blacklisted)',
  })
  @IsNotEmpty()
  @IsEnum(VendorStatus)
  vendorStatus: VendorStatus;

  @ApiProperty({ description: 'Vendor Address' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Metadata as JSON object' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
