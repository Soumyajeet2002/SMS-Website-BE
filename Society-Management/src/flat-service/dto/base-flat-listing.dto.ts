import {
    IsString,
    IsOptional,
    IsNumber,
    IsBoolean,
    IsUUID,
    IsDateString,
    IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

//to move out common fields so that media updation will be possible
export class BaseFlatListingDto {
    /* ---------- Multi-Society ---------- */

    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID()
    societyId: string;

    // @ApiPropertyOptional({
    //     example: '550e8400-e29b-41d4-a716-446655440111',
    // })
    // @IsOptional()
    // @IsUUID()
    // memberId?: string;

    /* ---------- Basic Info ---------- */

    @ApiProperty({ example: 'Spacious 2BHK for Rent' })
    @IsString()
    title: string;

    @ApiPropertyOptional({
        example: 'Well ventilated flat with park view',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        example: '2026-03-01',
    })
    @IsOptional()
    @IsDateString()
    availableFrom?: string;

    /* ---------- Pricing ---------- */

    @ApiPropertyOptional({ example: 15000 })
    @IsOptional()
    @IsNumber()
    rentAmount?: number;

    @ApiPropertyOptional({ example: 30000 })
    @IsOptional()
    @IsNumber()
    securityDeposit?: number;

    @ApiPropertyOptional({ example: 2000 })
    @IsOptional()
    @IsNumber()
    maintenanceAmount?: number;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    rentNegotiable?: boolean;

    /* ---------- Property Details ---------- */

    @ApiPropertyOptional({ example: '2BHK' })
    @IsOptional()
    @IsString()
    flatType?: string;

    @ApiPropertyOptional({ example: 2 })
    @IsOptional()
    @IsNumber()
    bedrooms?: number;

    @ApiPropertyOptional({ example: 2 })
    @IsOptional()
    @IsNumber()
    bathrooms?: number;

    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @IsNumber()
    balconies?: number;

    @ApiPropertyOptional({ example: 'Semi-Furnished' })
    @IsOptional()
    @IsString()
    furnishingType?: string;

    @ApiPropertyOptional({ example: 1200 })
    @IsOptional()
    @IsNumber()
    carpetArea?: number;

    @ApiPropertyOptional({ example: 'sq_ft' })
    @IsOptional()
    @IsString()
    areaUnit?: string;

    /* ---------- Location ---------- */

    @ApiProperty({ example: 356, description: 'ISO Country Code' })
    @IsNumber()
    countryCode: number;

    @ApiProperty({ example: 21 })
    @IsNumber()
    stateCode: number;

    @ApiProperty({ example: 345 })
    @IsNumber()
    districtCode: number;

    @ApiPropertyOptional({ example: 'Sector 5' })
    @IsOptional()
    @IsString()
    locality?: string;

    @ApiPropertyOptional({ example: '751024' })
    @IsOptional()
    @IsString()
    pincode?: string;

    @ApiPropertyOptional({ example: 20.2961 })
    @IsOptional()
    @IsNumber()
    latitude?: number;

    @ApiPropertyOptional({ example: 85.8245 })
    @IsOptional()
    @IsNumber()
    longitude?: number;

    /* ---------- Contact ---------- */

    @ApiPropertyOptional({ example: 'Ramesh Kumar' })
    @IsOptional()
    @IsString()
    contactName?: string;

    @ApiPropertyOptional({ example: '9876543210' })
    @IsOptional()
    @IsString()
    primaryMobile?: string;

    @ApiPropertyOptional({ example: '9123456780' })
    @IsOptional()
    @IsString()
    alternateMobile?: string;

    @ApiPropertyOptional({ example: 'owner@email.com' })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    whatsappAvailable?: boolean;

    @ApiPropertyOptional({ example: '9AM - 6PM' })
    @IsOptional()
    @IsString()
    preferredContactTime?: string;

    /* ---------- Visibility ---------- */

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    isPublic?: boolean;

    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;

    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @IsBoolean()
    showExactAddress?: boolean;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    isContactPublic?: boolean;

    /* ---------- Status ---------- */

    @ApiPropertyOptional({ example: 0, default: 0, description: '0=Draft,1=Pending,2=Active' })
    @IsOptional()
    @IsNumber()
    status?: number;

    @ApiPropertyOptional({ example: '2026-12-31T00:00:00.000Z' })
    @IsOptional()
    @IsDateString()
    expiresAt?: string;

    /* ---------- Extra ---------- */

    @ApiPropertyOptional({
        example: { facing: 'East', parking: true },
    })
    @IsOptional()
    @IsObject()
    details?: Record<string, any>;


}