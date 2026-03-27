
export function societyAmenityMapRequestMapper(societyId: string, amenityId: string, data: any) {
    return {
        society_id: societyId,
        amenity_id: amenityId,
        status: data.status,
    };
}