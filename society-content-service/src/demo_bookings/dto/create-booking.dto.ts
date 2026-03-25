import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetDemoRequestDetailsDto {
  @ApiProperty({ required: false, description: 'Filter by demoBy user ID' })
  @IsOptional()
  @IsString()
  demoBy?: string;
}
