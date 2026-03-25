import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGuestUserDto {
  @ApiProperty({
    description: 'Full name of the guest user',
    example: 'Test User',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;
  //
  @ApiProperty({
    description: 'Mobile number of the guest user',
    example: '9876543210',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, {
    message: 'Mobile number must be exactly 10 digits',
  })
  mobileNo: string;
  //
  @ApiPropertyOptional({
    description: 'Email address of the guest user',
    example: 'test.user@example.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;
  //
  @ApiPropertyOptional({
    description: 'City where the guest user is located',
    example: 'Bhubaneswar',
  })
  @IsNotEmpty()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'description of the guest user project or requirement',
    example:
      'Looking for society management software for a residential complex',
  })
  @IsOptional()
  @IsString()
  projectDescription?: string;
}
