import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class TierDetailDto {
  @ApiProperty({
    description: 'Amenity tier code',
    example: 'CORE',
  })
  @IsString()
  @IsNotEmpty()
  tierCode: string;

  // @ApiPropertyOptional({
  //   description: 'Tier price',
  //   example: '1999.00',
  // })
  // @IsOptional()
  // @IsString()
  // @Matches(/^\d+(\.\d{1,2})?$/, {
  //   message: 'tierPrice must be a valid value',
  // })
  // tierPrice?: string;

  // @ApiPropertyOptional({
  //   description: 'Whether tier is included in the package',
  //   example: true,
  //   default: true,
  // })
  // @IsOptional()
  // @IsBoolean()
  // isIncluded?: boolean;

  @ApiPropertyOptional({
    description: 'Record status',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  status?: number;
}
