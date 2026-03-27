"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatListingResponseMapper = flatListingResponseMapper;
const media_response_mapper_1 = require("../../media/mappers/media.response.mapper");
function flatListingResponseMapper(entity) {
    if (Array.isArray(entity)) {
        return entity.map(flatListingResponseMapper);
    }
    if (!entity)
        return null;
    return {
        id: entity.id,
        societyId: entity.society_id,
        memberId: entity.member_id,
        title: entity.title,
        description: entity.description,
        availableFrom: entity.available_from,
        rentAmount: entity.rent_amount,
        securityDeposit: entity.security_deposit,
        maintenanceAmount: entity.maintenance_amount,
        rentNegotiable: entity.rent_negotiable,
        flatType: entity.flat_type,
        bedrooms: entity.bedrooms,
        bathrooms: entity.bathrooms,
        balconies: entity.balconies,
        furnishingType: entity.furnishing_type,
        carpetArea: entity.carpet_area,
        areaUnit: entity.area_unit,
        countryCode: entity.country_code,
        stateCode: entity.state_code,
        districtCode: entity.district_code,
        locality: entity.locality,
        pincode: entity.pincode,
        latitude: entity.latitude,
        longitude: entity.longitude,
        contactName: entity.contact_name,
        primaryMobile: entity.primary_mobile,
        alternateMobile: entity.alternate_mobile,
        email: entity.email,
        whatsappAvailable: entity.whatsapp_available,
        preferredContactTime: entity.preferred_contact_time,
        isPublic: entity.is_public,
        isFeatured: entity.is_featured,
        showExactAddress: entity.show_exact_address,
        isContactPublic: entity.is_contact_public,
        status: entity.status,
        expiresAt: entity.expires_at,
        publishedAt: entity.published_at,
        details: entity.details ?? {},
        media: Array.isArray(entity.media)
            ? (0, media_response_mapper_1.mediaResponseMapper)(entity.media)
            : []
    };
}
//# sourceMappingURL=flat-listings.response.mapper.js.map