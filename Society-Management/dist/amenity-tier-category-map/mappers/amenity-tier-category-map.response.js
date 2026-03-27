"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amenityTierCategoryMapResponseMapper = amenityTierCategoryMapResponseMapper;
function amenityTierCategoryMapResponseMapper(entity) {
    return {
        id: entity.id,
        tierCode: entity.tier_code,
        categoryCode: entity.category_code,
        displayOrder: entity.display_order,
        status: entity.status
    };
}
//# sourceMappingURL=amenity-tier-category-map.response.js.map