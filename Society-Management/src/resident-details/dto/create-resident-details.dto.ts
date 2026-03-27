import { ApiProperty ,ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateResidentMapDto {

  @ApiProperty({
    description: 'Resident UUID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  residentId: string;

  @ApiProperty({
    description: 'Society ID',
    example: '660e8400-e29b-41d4-a716-446655440111',
  })
  @IsNotEmpty()
  societyId: string;

  @ApiProperty({
    description: 'Block ID',
    example: 101,
  })
  @IsNotEmpty()
  blockId: number;

  @ApiProperty({
    description: 'Flat Number',
    example: 'A-101',
  })
  @IsString()
  @IsNotEmpty()
  flatNumber: string;

  @ApiProperty({
    description: 'Owner Type (owner/tenant)',
    example: 'owner',
  })
  @IsString()
  @IsNotEmpty()
  ownerType: string;

  @ApiPropertyOptional({
    description: 'Move-in Date',
    example: '2024-01-15',
  })
  @IsOptional()
  @IsDateString()
  moveInDate?: Date;

  @ApiPropertyOptional({
    description: 'Emergency Contact Number',
    example: '9876543210',
  })
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiProperty({
    description: 'ID Proof Type',
    example: 'Aadhar',
  })
  @IsString()
  @IsNotEmpty()
  idProofType: string;

  @ApiPropertyOptional({
    description: 'ID Proof Document URL or Number',
    example: '1234-5678-9012',
  })
  @IsOptional()
  @IsString()
  idProofDoc: string;

  @ApiPropertyOptional({
    description: 'Profile Picture URL',
    example: 'https://example.com/profile.jpg',
  })
  @IsOptional()
  @IsString()
  profilePic?: string;
}
