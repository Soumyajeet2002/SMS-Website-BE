
export function categoryAmenityResponseMapper(entity: any) {
    return {
        id: entity.id,
        categoryCode: entity.category_code,
        amenityId: entity.amenity_id,
        order: entity.display_order,
        status: entity.status,
        meta: entity.metadata
    };
}
