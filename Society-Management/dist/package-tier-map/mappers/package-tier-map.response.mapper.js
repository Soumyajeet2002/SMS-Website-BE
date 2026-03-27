"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageTierMapResponseMapper = packageTierMapResponseMapper;
function packageTierMapResponseMapper(entity) {
    return {
        id: entity.id,
        packageId: entity.package_id,
        tierCode: entity.tier_code,
        status: entity.status,
    };
}
//# sourceMappingURL=package-tier-map.response.mapper.js.map