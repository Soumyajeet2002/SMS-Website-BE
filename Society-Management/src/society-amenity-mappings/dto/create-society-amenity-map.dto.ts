import {
    IsUUID,
    IsArray,
    ArrayMinSize,
    ValidateNested
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AmenityDetailsDto } from './amenity-details.dto';


export class CreateSocietyAmenityMapDto {

    @ApiProperty({
        description: 'Society id',
        example: '151f21fb-6dad-4529-b875-60ecb58dc996',
    })
    @IsUUID()
    societyId: string;

    @ApiProperty({
        description: 'List of amenities',
        type: [AmenityDetailsDto],
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => AmenityDetailsDto)
    amenityDetails: AmenityDetailsDto[];

}