import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsOptional, IsNotEmpty } from 'class-validator';

export class CategoryDetailDto {

  @ApiProperty({
    description: 'Category code',
    example: 'SECURE&SAFE',
  })
  @IsString()
  @IsNotEmpty()
  categoryCode: string;

  @ApiProperty({
    description: 'Display order of category within the tier',
    example: 1,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @ApiProperty({
    description: 'Status of the mapping (0 = inactive, 1 = active, 2 = deleted)',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  status?: number;
}
