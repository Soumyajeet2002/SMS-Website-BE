// import { PartialType } from '@nestjs/mapped-types';
// import { CreateGuestUserDto } from './create-guest-user.dto';

// export class UpdateGuestUserDto extends PartialType(CreateGuestUserDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { CreateGuestUserDto } from './create-guest-user.dto';

export class UpdateGuestUserDto extends PartialType(CreateGuestUserDto) {
  @ApiPropertyOptional({
    description: 'User who updated the guest user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsOptional()
  updatedBy?: string;
}
