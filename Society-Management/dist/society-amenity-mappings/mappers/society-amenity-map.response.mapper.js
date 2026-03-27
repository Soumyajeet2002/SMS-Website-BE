"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.societyAmenityMapResponseMapper = societyAmenityMapResponseMapper;
function societyAmenityMapResponseMapper(entity) {
    return {
        id: entity.id,
        societyId: entity.society_id,
        amenityId: entity.amenity_id,
        status: entity.status
    };
}
//# sourceMappingURL=society-amenity-map.response.mapper.js.map