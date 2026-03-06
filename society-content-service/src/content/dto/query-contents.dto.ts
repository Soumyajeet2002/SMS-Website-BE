// import { ApiPropertyOptional } from '@nestjs/swagger';
// import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

// export class QueryContentDto {
//   @ApiPropertyOptional({
//     description: 'Search by title',
//     example: 'Welcome',
//   })
//   @IsOptional()
//   @IsString()
//   search?: string;

//   @ApiPropertyOptional({
//     description: 'Page number',
//     example: 1,
//     default: 1,
//   })
//   @IsOptional()
//   @IsNumberString()
//   page?: number;

//   @ApiPropertyOptional({
//     description: 'Limit per page',
//     example: 10,
//     default: 10,
//   })
//   @IsOptional()
//   @IsNumberString()
//   limit?: number;

//   @ApiPropertyOptional({
//     description: 'Sort by field',
//     example: 'createdAt',
//     default: 'createdAt',
//   })
//   @IsOptional()
//   @IsString()
//   sortBy?: string;

//   @ApiPropertyOptional({
//     description: 'Sort order',
//     example: 'DESC',
//     enum: ['ASC', 'DESC'],
//     default: 'DESC',
//   })
//   @IsOptional()
//   @IsIn(['ASC', 'DESC'])
//   sortOrder?: 'ASC' | 'DESC';
// }

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryContentDto {
  @ApiPropertyOptional({
    description: 'Search by slug or contentType',
    example: 'home-page',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by content type',
    example: 'page',
  })
  @IsOptional()
  @IsString()
  contentType?: string;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({
    description: 'Limit per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Sort by field',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
