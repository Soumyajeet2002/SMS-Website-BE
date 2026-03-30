import {
  IsUUID,
  IsDateString,
  IsString,
  IsOptional,
  IsIn,
  Length,
  IsNotEmpty,
  IsObject,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSecurityGuardsDto {

  @ApiProperty({
    description: 'Guard UUID (from identity service)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  guardId: string;

  @ApiProperty({
    description: 'Vendor/Agency UUID',
    example: '550e8400-e29b-41d4-a716-446655440111',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  vendorId?: string;

  @ApiProperty({
    description: 'Date of birth of the guard',
    example: '1990-05-10',
  })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({
    description: 'Gender (M/F/O)',
    example: 'M',
  })
  @IsString()
  @IsIn(['M', 'F', 'O'])
  gender: string;

  @ApiProperty({
    description: 'Emergency contact number',
    example: '9876543210',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(10, 15)
  emergencyContact?: string;

  @ApiProperty({
    description: 'Permanent address',
    example: 'Bhubaneswar, Odisha',
  })
  @IsString()
  @IsNotEmpty()
  permanentAddress: string;

  @ApiProperty({
    description: 'Current address',
    example: 'Cuttack, Odisha',
    required: false,
  })
  @IsOptional()
  @IsString()
  currentAddress?: string;

  @ApiProperty({
    description: 'Profile photo URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  profilePhotoUrl?: string;

  @ApiProperty({
    description: 'ID type (Aadhaar, PAN, etc.)',
    example: 'Aadhaar',
  })
  @IsString()
  idType: string;

  @ApiProperty({
    description: 'ID number',
    example: '123456789012',
  })
  @IsString()
  idNumber: string;

  @ApiProperty({
    description: 'ID proof document URL',
    example: 'https://example.com/id-proof.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  idProofUrl?: string;

  @ApiProperty({
    description: 'Joining date',
    example: '2024-01-01',
  })
  @IsDateString()
  joiningDate: string;

  @ApiProperty({
    description: 'Employment type (P = Permanent, C = Contract)',
    example: 'P',
    enum: ['P', 'C'],
  })
  @IsString()
  @IsIn(['P', 'C'])
  employmentType: string;

  @ApiProperty({
    description: 'Designation of the guard',
    example: 'Security Guard',
    required: false,
  })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiProperty({
    description: 'Metadata (JSON object)',
    example: { shift: 'night', uniformIssued: true },
    required: false,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'Status (1 = Active, 0 = Inactive, 2 = Deleted)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  status?: number;

}