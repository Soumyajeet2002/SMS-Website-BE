import { PackageTierMapEntity } from "../entities/package-tier-map.entities";

export function packageTierMapRequestMapper(packageId: string, data: any): Partial<PackageTierMapEntity> {
    return {
        package_id: packageId,
        tier_code: data.tierCode,
        // tier_price: data.tierPrice,
        // is_included: data.isIncluded,
        status: data.status,
    };
}
