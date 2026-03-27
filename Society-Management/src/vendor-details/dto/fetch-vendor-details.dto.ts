import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsIn, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { VendorStatus } from '../entities/vendor-details.entities';

export class GetVendorQueryDto {
  @ApiPropertyOptional({
    description: 'Search vendors by name or type',
    example: 'Tech',
  })
  @IsOptional()
  @IsString()
  search?: string;

  //   @ApiPropertyOptional({
  //     description: 'Filter vendors by status',
  //     enum: VendorStatus,
  //     example: VendorStatus.ACTIVE,
  //   })
  //   @IsOptional()
  //   @IsEnum(VendorStatus)
  //   vendorStatus?: VendorStatus;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of records per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    example: 'vendor_name',
    default: 'created_at',
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'created_at';

  @ApiPropertyOptional({
    description: 'Sort order',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
