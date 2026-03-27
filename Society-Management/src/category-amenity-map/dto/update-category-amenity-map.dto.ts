import { PartialType } from "@nestjs/swagger";
import { CreateCategoryAmenityMapDto } from "./create-category-amenity-map.dto";

export class UpdateCategoryAmenityMapDto extends PartialType(CreateCategoryAmenityMapDto) {

}