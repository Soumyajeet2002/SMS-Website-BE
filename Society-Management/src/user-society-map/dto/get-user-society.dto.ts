import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';

export class GetUserSocietyDto {

    @ApiPropertyOptional({
        description: 'User ID',
        example: 'b3f5a9c4-1234-4f5c-a9b2-abcdef123456'
    })
    @IsOptional()
    @IsUUID()
    userId?: string;

    @ApiPropertyOptional({
        description: 'Society ID',
        example: '660e8400-e29b-41d4-a716-446655440111'
    })
    @IsOptional()
    @IsUUID()
    societyId?: string;
}