export function packageTierAllResponseMapper(entities: any[]) {
    if (!entities || !entities.length) return [];

    const packageMap = new Map<string, any>();

    for (const item of entities) {

        if (!packageMap.has(item.package_code)) {
            packageMap.set(item.package_code, {
                packageCode: item.package_code,
                packageName: item.package_name,
                billingCycle: item.billing_cycle || null,
                price: item.price,
                allowsTrial: item.allows_trial,
                trialDays: item.trial_days || null,
                tierDetails: []
            });
        }

        packageMap.get(item.package_code).tierDetails.push({
            id: item.id,
            tierCode: item.tier_code,
            tierName: item.tier_name,
            // tierPrice: item.tier_price,
            // isIncluded: item.is_included,
            status: item.status,
            // createdBy: item.created_by,
            // createdAt: item.created_at,
            // updatedBy: item.updated_by,
            // updatedAt: item.updated_at,
        });
    }

    return Array.from(packageMap.values());
}
