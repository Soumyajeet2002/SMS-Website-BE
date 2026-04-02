"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapper = void 0;
exports.mapper = {
    response: {
        createVendor: (data) => ({
            message: 'Vendor created successfully',
            vendor: {
                vendorId: data.vendorId,
                societyId: data.societyId,
                name: data.vendorName,
                type: data.vendorType,
                status: data.vendorStatus,
                email: data.email,
                phone: data.phoneNo,
                createdAt: data.created_at,
                createdBy: data.created_by,
            },
        }),
        getAllVendors: (data, meta) => ({
            message: 'Vendors fetched successfully',
            meta: {
                page: meta.page,
                limit: meta.limit,
                total: meta.total,
                totalPages: meta.totalPages,
            },
            vendors: data.map((v) => ({
                vendorId: v.vendorId,
                societyId: v.societyId,
                name: v.vendorName,
                type: v.vendorType,
                status: v.vendorStatus,
            })),
        }),
        updateVendor: (data) => ({
            message: 'Vendor updated successfully',
            vendor: {
                vendorId: data.vendorId,
                societyId: data.societyId,
                name: data.vendorName,
                type: data.vendorType,
                status: data.vendorStatus,
                email: data.email,
                phone: data.phoneNo,
                updatedAt: data.updated_at,
            },
        }),
    },
};
//# sourceMappingURL=vendor-details-response.mapper.js.map