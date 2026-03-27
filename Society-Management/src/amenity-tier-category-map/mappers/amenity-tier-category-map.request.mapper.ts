export function amenityTierCategoryMapReqMapper(tiercode: any, category:any) {
    return {
        tier_code: tiercode,
        category_code: category.categoryCode,
        display_order: category.displayOrder,
        status: category.status
    };

    // const data: any = {};

    // if (mapped.tierCode !== undefined) {
    //     data.tier_code = mapped.tierCode;
    // }

    // if (mapped.categoryCode !== undefined) {
    //     data.category_code = mapped.categoryCode;
    // }

    // if (mapped.displayOrder !== undefined) {
    //     data.display_order = mapped.displayOrder;
    // }

    // if (mapped.status !== undefined) {
    //     data.status = mapped.status;
    // }
    // data.created_by = mapped.createdBy

    // return data;
}
