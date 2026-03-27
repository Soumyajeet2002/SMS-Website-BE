import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsUUID,
    IsOptional,
    IsInt,
    IsObject,
    Min,
    IsNotEmpty,
    IsArray,
    ArrayMinSize,
    ValidateNested,
} from 'class-validator';
import { AmenityDetailDto } from './amenity-detail.dto';
import { Type } from 'class-transformer';

export class CreateCategoryAmenityMapDto {
    @ApiProperty({
        description: 'Category code to which the amenity belongs',
        example: 'SECURITY',
    })
    @IsString()
    @IsNotEmpty()
    categoryCode: string;

    @ApiProperty({
        description: 'List of amenities for the category',
        type: [AmenityDetailDto],
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => AmenityDetailDto)
    amenityDetails: AmenityDetailDto[];
}
