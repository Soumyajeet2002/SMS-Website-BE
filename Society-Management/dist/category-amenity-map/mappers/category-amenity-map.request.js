"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryAmenityRequestMapper = categoryAmenityRequestMapper;
function categoryAmenityRequestMapper(catgCode, amenity) {
    return {
        category_code: catgCode,
        amenity_id: amenity.amenityId,
        display_order: amenity.displayOrder,
        status: amenity.status,
        metadata: amenity.metadata
    };
}
//# sourceMappingURL=category-amenity-map.request.js.map