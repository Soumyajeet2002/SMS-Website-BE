import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class AdminSocietyMapDto {
    @ApiProperty({
        description: 'User ID from identity service',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({
        description: 'Society ID from society_management.societies',
        example: '660e8400-e29b-41d4-a716-446655440111',
    })
    @IsUUID()
    @IsNotEmpty()
    roleId: string;

    @ApiProperty({
        description: 'Role of the user within the society',
        example: 'Admin',
    })
    @IsString()
    @IsNotEmpty()
    roleName: string;

 
}
