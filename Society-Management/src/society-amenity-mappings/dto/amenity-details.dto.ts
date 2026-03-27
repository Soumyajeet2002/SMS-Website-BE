import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsUUID,
    IsOptional,
    IsInt,
    IsNotEmpty
} from 'class-validator';

export class AmenityDetailsDto {

    @ApiProperty({
        description: 'Amenity id',
        example: 'f7a0e3c0-56c0-4b7e-8b45-63c41b0c1c9e',
    })
    @IsUUID()
    @IsNotEmpty()
    amenityId: string;

    @ApiPropertyOptional({
        description: 'Record status',
        example: 1,
        default: 1,
    })
    @IsOptional()
    @IsInt()
    status?: number;

}