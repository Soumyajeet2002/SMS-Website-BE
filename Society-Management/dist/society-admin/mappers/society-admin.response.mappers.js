"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesSocietyResponseMapper = servicesSocietyResponseMapper;
function servicesSocietyResponseMapper(entities, societyId) {
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
//# sourceMappingURL=society-admin.response.mappers.js.map