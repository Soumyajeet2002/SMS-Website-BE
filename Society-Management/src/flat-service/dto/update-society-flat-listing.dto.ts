import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsArray, IsOptional, IsUUID, ValidateNested } from "class-validator";
import { UpdateMediaDto } from "src/media/dto/update-media.dto";
import { Type } from "class-transformer";
import { BaseFlatListingDto } from "./base-flat-listing.dto";

export class UpdateSocietyFlatListingDto extends PartialType(BaseFlatListingDto) {

    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID()
    id: string;

    @ApiProperty({ type: [UpdateMediaDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateMediaDto)
    media?: UpdateMediaDto[];

}