import {
    IsNumber,
    IsOptional,
    IsString,
    IsBoolean,
    IsObject,
    IsUUID,
    IsEnum,
    MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

enum MediaType {
    IMAGE = 1,
    VIDEO = 2,
    DOCUMENT = 3,
    AUDIO = 4,
}

export class CreateMediaDto {

    // @ApiProperty({
    //     example: '550e8400-e29b-41d4-a716-446655440000',
    // })
    // @IsUUID()
    // societyId: string;

    // @ApiProperty({
    //     example: 'flat_listing',
    //     description: 'flat_listing, member, complaint',
    // })
    // @IsString()
    // entityType: string;

    // @ApiProperty({
    //     example: '550e8400-e29b-41d4-a716-446655440000',
    // })
    // @IsUUID()
    // entityId: string;

    // @ApiProperty({
    //     example: 1,
    //     description: '1 = Image, 2 = Video, 3 = Document, 4 = Audio',
    // })
    // @Type(() => Number)
    // @IsEnum(MediaType)
    // mediaType: MediaType;

    @ApiProperty({ example: 'living-room.jpg' })
    @IsString()
    @MaxLength(255)
    fileName: string;

    @ApiProperty({ example: '/uploads/flats/living-room.jpg' })
    @IsString()
    filePath: string;

    @ApiPropertyOptional({ example: 204800 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    fileSize?: number;

    @ApiPropertyOptional({ example: 'image/jpeg' })
    @IsOptional()
    @IsString()
    mimeType?: string;

    @ApiPropertyOptional({ example: 'jpg' })
    @IsOptional()
    @IsString()
    fileExtension?: string;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean;

    @ApiPropertyOptional({ example: 0 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    displayOrder?: number;

    @ApiProperty({
        example: 1,
        default: 1,
        description: '0 = Inactive, 1 = Active, 2 = Deleted'
    })
    @Type(() => Number)
    @IsNumber()
    status: number;

    @ApiPropertyOptional({
        example: { width: 1080, height: 720 },
    })
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}
