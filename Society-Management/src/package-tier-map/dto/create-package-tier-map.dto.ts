import { IsUUID, IsString, IsOptional, IsBoolean, IsNumberString, IsInt, Matches, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TierDetailDto } from './tier-detail.dto';
import { Type } from 'class-transformer';

export class CreatePackageTierMapDto {
    @ApiProperty({
        description: 'Package id',
        example: '151f21fb-6dad-4529-b875-60ecb58dc996',
    })
    @IsUUID()
    packageId: string;

    @ApiProperty({
        description: 'List of tier details',
        type: [TierDetailDto],
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => TierDetailDto)
    tierDetails: TierDetailDto[];

}
