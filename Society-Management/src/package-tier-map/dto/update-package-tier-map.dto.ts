import { PartialType } from "@nestjs/swagger";
import { CreatePackageTierMapDto } from "./create-package-tier-map.dto";


export class UpdatePackageTierMapDto extends PartialType(CreatePackageTierMapDto) {

}