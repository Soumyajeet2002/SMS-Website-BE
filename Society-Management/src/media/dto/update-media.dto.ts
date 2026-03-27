import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";
import { CreateMediaDto } from "./create-media.dto";

export class UpdateMediaDto extends PartialType(CreateMediaDto) {

    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsOptional()
    @IsUUID()
    id?: string;

}