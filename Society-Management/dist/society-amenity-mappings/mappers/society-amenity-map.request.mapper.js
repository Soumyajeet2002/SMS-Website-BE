"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.societyAmenityMapRequestMapper = societyAmenityMapRequestMapper;
function societyAmenityMapRequestMapper(societyId, amenityId, data) {
    return {
        society_id: societyId,
        amenity_id: amenityId,
        status: data.status,
    };
}
//# sourceMappingURL=society-amenity-map.request.mapper.js.map