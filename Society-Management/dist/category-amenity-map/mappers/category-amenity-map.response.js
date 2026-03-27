"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryAmenityResponseMapper = categoryAmenityResponseMapper;
function categoryAmenityResponseMapper(entity) {
    return {
        id: entity.id,
        categoryCode: entity.category_code,
        amenityId: entity.amenity_id,
        order: entity.display_order,
        status: entity.status,
        meta: entity.metadata
    };
}
//# sourceMappingURL=category-amenity-map.response.js.map