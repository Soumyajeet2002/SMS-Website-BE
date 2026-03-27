// export function amenityTierCategoryAllResponseMapper(entities: any[]) {
//     if (!entities || !entities.length) return [];

//     return entities.map((item: any) => ({
//         id: item.id,
//         tierCode: item.tier_code,
//         tierName: item.tier_name || null,
//         categoryCode: item.category_code,
//         categoryName: item.category_name || null,
//         displayOrder: item.display_order,
//         status: item.status,
//         createdBy: item.created_by,
//         createdAt: item.created_at,
//         updatedBy: item.updated_by,
//         updatedAt: item.updated_at,
//     }));
// }


export function amenityTierCategoryAllResponseMapper(entities: any[]) {
    if (!entities || !entities.length) return [];

    const tierMap = new Map<string, any>();

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
