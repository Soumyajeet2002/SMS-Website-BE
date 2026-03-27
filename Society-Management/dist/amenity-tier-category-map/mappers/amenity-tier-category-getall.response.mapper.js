"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amenityTierCategoryAllResponseMapper = amenityTierCategoryAllResponseMapper;
function amenityTierCategoryAllResponseMapper(entities) {
    if (!entities || !entities.length)
        return [];
    const tierMap = new Map();
    for (const item of entities) {
        if (!tierMap.has(item.tier_code)) {
            tierMap.set(item.tier_code, {
                tierCode: item.tier_code,
                tierName: item.tier_name || null,
                categoryDetails: []
            });
        }
        tierMap.get(item.tier_code).categoryDetails.push({
            id: item.id,
            categoryCode: item.category_code,
            categoryName: item.category_name || null,
            displayOrder: item.display_order,
            status: item.status
        });
    }
    return Array.from(tierMap.values());
}
//# sourceMappingURL=amenity-tier-category-getall.response.mapper.js.map