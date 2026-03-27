import { CategoryAmenityMapEntity } from "../entities/category-amenity-map.entities";

export function categoryAmenityRequestMapper(catgCode: any, amenity: any): Partial<CategoryAmenityMapEntity> {
    return {
        category_code: catgCode,
        amenity_id: amenity.amenityId,
        display_order: amenity.displayOrder,
        status: amenity.status,
        metadata: amenity.metadata
    };
}
