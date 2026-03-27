import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsUUID,
    IsOptional,
    IsInt,
    IsObject,
    Min,
} from 'class-validator';

export class AmenityDetailDto {

    @ApiProperty({
        description: 'Amenity identifier',
        example: '5e518167-5a13-4c2d-b694-3cad433e0c17',
    })
    @IsUUID()
    amenityId: string;

    @ApiPropertyOptional({
        description: 'Display order of amenity within the category',
        example: 1,
        minimum: 0,
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    displayOrder?: number;

    @ApiPropertyOptional({
        description: 'Status of mapping (1 = active, 2 = inactive)',
        example: 1,
        default: 1,
    })
    @IsOptional()
    @IsInt()
    status?: number;

    @ApiPropertyOptional({
        description: 'Additional metadata for category-amenity mapping',
        example: { icon: 'pool', isPaid: false },
    })
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}
