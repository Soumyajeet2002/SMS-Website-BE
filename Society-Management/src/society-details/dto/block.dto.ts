import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BlockDto {
  @ApiProperty({ example: 'A Block' })
  @IsOptional()
  @IsString()
  blockName: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  numberOfBuildings?: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsInt()
  numberOfFloors: number;

  @ApiProperty({ example: 200 })
  @IsOptional()
  @IsInt()
  totalFlats: number;

  @ApiPropertyOptional({ example: 80 })
  @IsOptional()
  @IsInt()
  parkingSlots?: number;

  
  @ApiProperty()
    @IsOptional()
    @IsString()
    blockCode: string;

  
  @IsString()
  @IsOptional()
  blockType?: string;
}
