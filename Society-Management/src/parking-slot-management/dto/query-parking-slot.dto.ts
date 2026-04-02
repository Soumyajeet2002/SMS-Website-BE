import { IsOptional, IsUUID, IsString, IsNumberString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetParkingSlotsDto {
  //   @ApiPropertyOptional()
  //   @IsOptional()
  //   @IsUUID()
  //   vehicleId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  residentUuid?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  blockId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rowNo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  columnNo?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumberString()
  limit?: number;
}
