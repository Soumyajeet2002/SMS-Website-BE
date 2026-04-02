export const mapper = {
  response: {
    createVendor: (data: any) => ({
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

    getAllVendors: (data: any[], meta: any) => ({
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

    updateVendor: (data: any) => ({
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
