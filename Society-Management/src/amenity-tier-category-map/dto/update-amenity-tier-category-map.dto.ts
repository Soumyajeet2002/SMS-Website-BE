import { PartialType } from "@nestjs/swagger";
import { CreateAmenityTierCategoryMapDto } from "./create-amenity-tier-category-map.dto";

export class UpdateAmenityTierCategoryMap extends PartialType(CreateAmenityTierCategoryMapDto) {

}