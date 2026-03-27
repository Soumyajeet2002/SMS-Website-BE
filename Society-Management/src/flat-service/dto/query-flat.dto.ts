import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class QueryFlatDto {

    @ApiPropertyOptional({
        description: "Filter by Society ID (UUID). If not provided, flats from all societies will be returned.",
        example: "550e8400-e29b-41d4-a716-446655440000"
    })
    @IsOptional()
    @IsUUID()
    societyId?: string;

    @ApiPropertyOptional({
        description: "Filter by Member ID (Owner/Poster UUID).",
        example: "660e8400-e29b-41d4-a716-446655440111"
    })
    @IsOptional()
    @IsUUID()
    memberId?: string;

    @ApiPropertyOptional({
        description: "Filter by Flat Type (e.g., 1BHK, 2BHK, 3BHK).",
        example: "2BHK"
    })
    @IsOptional()
    @IsString()
    flatType?: string;

    @ApiPropertyOptional({
        description: "Filter by Furnishing Type (e.g., Furnished, Semi-Furnished, Unfurnished).",
        example: "Semi-Furnished"
    })
    @IsOptional()
    @IsString()
    furnishingType?: string;

    @ApiPropertyOptional({
        description: "Filter by Pincode.",
        example: "751024"
    })
    @IsOptional()
    @IsString()
    pincode?: string;

    @ApiPropertyOptional({
        description: "Page Number",
        example: 1,
        default: 1
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number;

    @ApiPropertyOptional({
        description: "Number of records per page",
        example: 10,
        default: 10
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number;

    @ApiPropertyOptional({
        description: "Field name to sort by (e.g., created_at, rent_amount, available_from).",
        example: "created_at",
        default: "created_at"
    })
    @IsOptional()
    @IsString()
    sortBy?: string;

    @ApiPropertyOptional({
        description: "Sorting order",
        example: "DESC",
        enum: ["ASC", "DESC"],
        default: "DESC"
    })
    @IsOptional()
    @IsIn(["ASC", "DESC"])
    sortOrder?: "ASC" | "DESC";
}
