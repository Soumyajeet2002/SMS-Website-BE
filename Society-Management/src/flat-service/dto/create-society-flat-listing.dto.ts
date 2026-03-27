import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsUUID,
  IsDateString,
  IsArray,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateMediaDto } from 'src/media/dto/create-media.dto';
import { BaseFlatListingDto } from './base-flat-listing.dto';


export class CreateSocietyFlatListingDto extends BaseFlatListingDto {

  /* ---------- Media ---------- */

  @ApiPropertyOptional({
    type: [CreateMediaDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMediaDto)
  media?: CreateMediaDto[];
}
