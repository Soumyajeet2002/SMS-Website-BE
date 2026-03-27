import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class SocietyIdDto {
    @ApiProperty({ example: '07f705e7-4a4d-41fd-b91c-9154cab46495' })
    @IsOptional()
    @IsUUID()
    societyId?: string;
}