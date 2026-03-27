"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryAmenityMapAllResponseMapper = categoryAmenityMapAllResponseMapper;
function categoryAmenityMapAllResponseMapper(entities) {
    if (!entities || !entities.length)
        return [];
    const categoryMap = new Map();
    for (const item of entities) {
        if (!categoryMap.has(item.category_code)) {
            categoryMap.set(item.category_code, {
                categoryCode: item.category_code,
                categoryName: item.gencode_name || null,
                amenityDetails: []
            });
        }
        categoryMap.get(item.category_code).amenityDetails.push({
            id: item.id,
            amenityCode: item.amenity_code,
            amenityName: item.amenity_name,
            amenityDescription: item.description ?? null,
            amenityIconUrl: item.icon_url ?? null,
            isAmenityChargeable: item.is_chargeable,
            isAmenityActive: item.amenity_status ?? 0,
            amenityMetadata: item.amenity_metadata ?? {},
            displayOrder: item.display_order,
            status: item.mapping_status
        });
    }
    return Array.from(categoryMap.values());
}
//# sourceMappingURL=category-amenity-getall.response.mapper.js.map