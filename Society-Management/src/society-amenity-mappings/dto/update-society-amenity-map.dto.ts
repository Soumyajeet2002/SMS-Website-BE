import { PartialType } from "@nestjs/swagger";
import { CreateSocietyAmenityMapDto } from "./create-society-amenity-map.dto";


export class UpdateSocietyAmenityMapDto extends PartialType(CreateSocietyAmenityMapDto) {

}