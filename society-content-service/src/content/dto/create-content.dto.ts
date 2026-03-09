import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsObject,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContentStatus } from '../entities/content.entity';

export class CreateContentDto {
  @ApiProperty({
    description: 'Society ID to which content belongs',
    example: '550e8400-e29b-41d4-a716-446655440000',
    // example: '1',
  })
  @IsUUID()
  @IsNotEmpty()
  societyId: string;

  @ApiProperty({
    description: 'Unique slug for the content',
    example: 'homepage-banner',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    description: 'Title of the content',
    example: 'Welcome Banner',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Content type (BANNER, NOTICE, BLOG, etc)',
    example: 'BANNER',
  })
  @IsString()
  @IsNotEmpty()
  contentType: string;

  @ApiPropertyOptional({
    description: 'Priority for sorting display',
    example: 1,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  priority?: number;

  @ApiPropertyOptional({
    description: 'Whether the content is featured',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    description: 'Publish date & time',
    example: '2025-03-01T10:00:00Z',
    nullable: true,
  })
  @IsOptional()
  publishAt?: Date;

  @ApiPropertyOptional({
    description: 'Expiry date & time',
    example: '2025-04-01T10:00:00Z',
    nullable: true,
  })
  @IsOptional()
  expireAt?: Date;

  @ApiPropertyOptional({
    description: 'Additional metadata stored as JSON',
    example: { layout: 'full-width', theme: 'dark' },
    nullable: true,
    type: Object,
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Content status',
    enum: ContentStatus,
    example: ContentStatus.ACTIVE,
    default: ContentStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;
}
