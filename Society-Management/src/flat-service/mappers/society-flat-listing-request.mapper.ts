

export function societyFlatListingRequestMapper(data: any) {
  return {
    society_id: data.societyId,
    member_id: data.memberId,

    /* ---------- Basic Info ---------- */
    title: data.title,
    description: data.description,
    available_from: data.availableFrom,

    /* ---------- Pricing ---------- */
    rent_amount: data.rentAmount,
    security_deposit: data.securityDeposit,
    maintenance_amount: data.maintenanceAmount,
    rent_negotiable: data.rentNegotiable,

    /* ---------- Property Details ---------- */
    flat_type: data.flatType,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    balconies: data.balconies,
    furnishing_type: data.furnishingType,
    carpet_area: data.carpetArea,
    area_unit: data.areaUnit,

    /* ---------- Location ---------- */
    country_code: data.countryCode,
    state_code: data.stateCode,
    district_code: data.districtCode,
    locality: data.locality,
    pincode: data.pincode,
    latitude: data.latitude,
    longitude: data.longitude,

    /* ---------- Contact ---------- */
    contact_name: data.contactName,
    primary_mobile: data.primaryMobile,
    alternate_mobile: data.alternateMobile,
    email: data.email,
    whatsapp_available: data.whatsappAvailable,
    preferred_contact_time: data.preferredContactTime,

    /* ---------- Visibility ---------- */
    is_public: data.isPublic,
    is_featured: data.isFeatured,
    show_exact_address: data.showExactAddress,
    is_contact_public: data.isContactPublic,

    /* ---------- Status ---------- */
    status: data.status,
    expires_at: data.expiresAt,
    published_at: data.publishedAt,

    /* ---------- JSON ---------- */
    details: data.details,
  };
}
