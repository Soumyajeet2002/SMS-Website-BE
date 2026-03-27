import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min, IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { CategoryDetailDto } from './category-detail.dto';
import { Type } from 'class-transformer';

export class CreateAmenityTierCategoryMapDto {
    @ApiProperty({
        description: 'Amenity tier code',
        example: 'CORE',
    })
    @IsString()
    @IsNotEmpty()
    tierCode: string;

    @ApiProperty({
        description: 'List of category details for the tier',
        type: [CategoryDetailDto],
    })
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CategoryDetailDto)
    categoryDetails: CategoryDetailDto[];
}
