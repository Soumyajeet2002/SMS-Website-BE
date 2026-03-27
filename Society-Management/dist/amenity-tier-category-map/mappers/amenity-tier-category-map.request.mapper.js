"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amenityTierCategoryMapReqMapper = amenityTierCategoryMapReqMapper;
function amenityTierCategoryMapReqMapper(tiercode, category) {
    return {
        tier_code: tiercode,
        category_code: category.categoryCode,
        display_order: category.displayOrder,
        status: category.status
    };
}
//# sourceMappingURL=amenity-tier-category-map.request.mapper.js.map