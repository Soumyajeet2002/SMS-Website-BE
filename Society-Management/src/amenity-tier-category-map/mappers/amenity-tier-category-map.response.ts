export function amenityTierCategoryMapResponseMapper(entity: any) {
    return {
        id: entity.id,
        tierCode: entity.tier_code,
        categoryCode: entity.category_code,
        displayOrder: entity.display_order,
        status: entity.status
    };
}
