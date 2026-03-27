export function servicesSocietyResponseMapper(entities: any[], societyId: string) {

    if (!entities || !entities.length) {
        return {
            societyId,
            services: []
        };
    }

    const services = entities.map((item) => ({
        serviceId: item.serviceId,
        serviceName: item.serviceName,
        iconUrl: item.iconUrl,
        metaData: item.metaData,
        displayOrder: item.displayOrder,
        isAccess: item.allowAccess
    }));

    return {
        societyId,
        services
    };
}