export function societyAmenityAllResponseMapper(data: any[]) {

    if (!data.length) return {};

    const societyId = data[0].society_id;
    const societyName = data[0].society_name;

    const categoryMap = new Map();

    data.forEach(row => {
        const categoryCode = row.category_code || 'UNCATEGORIZED';
        const categoryName = row.category_name || 'Uncategorized';

        if (!categoryMap.has(categoryCode)) {
            categoryMap.set(categoryCode, {
                categoryCode,
                categoryName,
                amenityDetails: []
            });
        }

        categoryMap.get(categoryCode).amenityDetails.push({
            id: row.mapping_id,
            amenityId: row.amenity_id,
            amenityName: row.amenity_name,
            status: row.status,
            isMapped: row.isMapped
        });
    });

    return {
        societyId,
        societyName,
        categoryDetails: Array.from(categoryMap.values())
    };
}