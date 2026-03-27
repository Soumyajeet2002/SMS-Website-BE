import { PartialType } from "@nestjs/swagger";
import { CreateUserSocietyMapDto } from "./create-user-society-map.dto";

export class UpdateUserSocietyMapDto extends PartialType(CreateUserSocietyMapDto) {



}