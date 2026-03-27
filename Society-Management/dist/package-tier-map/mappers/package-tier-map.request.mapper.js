"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageTierMapRequestMapper = packageTierMapRequestMapper;
function packageTierMapRequestMapper(packageId, data) {
    return {
        package_id: packageId,
        tier_code: data.tierCode,
        status: data.status,
    };
}
//# sourceMappingURL=package-tier-map.request.mapper.js.map