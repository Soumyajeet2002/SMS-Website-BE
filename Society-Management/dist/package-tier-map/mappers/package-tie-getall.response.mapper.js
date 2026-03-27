"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageTierAllResponseMapper = packageTierAllResponseMapper;
function packageTierAllResponseMapper(entities) {
    if (!entities || !entities.length)
        return [];
    const packageMap = new Map();
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
            status: item.status,
        });
    }
    return Array.from(packageMap.values());
}
//# sourceMappingURL=package-tie-getall.response.mapper.js.map