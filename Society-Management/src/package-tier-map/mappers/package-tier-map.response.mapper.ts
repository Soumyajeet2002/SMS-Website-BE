import { PackageTierMapEntity } from "../entities/package-tier-map.entities";


export function packageTierMapResponseMapper(entity: PackageTierMapEntity): any {
    return {
        id: entity.id,
        packageId: entity.package_id,
        tierCode: entity.tier_code,
        // tierPrice: entity.tier_price,
        // isIncluded: entity.is_included,
        status: entity.status,
        // createdBy: entity.created_by,
        // createdAt: entity.created_at,
        // updatedBy: entity.updated_by,
        // updatedAt: entity.updated_at,
    };
}
