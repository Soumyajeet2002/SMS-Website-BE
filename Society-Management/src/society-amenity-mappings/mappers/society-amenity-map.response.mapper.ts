import { SocietyAmenityMappingsEntity } from "../entities/society-amenity-map.entities";

export function societyAmenityMapResponseMapper(entity: SocietyAmenityMappingsEntity): any {
    return {
        id: entity.id,
        societyId: entity.society_id,
        amenityId: entity.amenity_id,
        status: entity.status
    };
}