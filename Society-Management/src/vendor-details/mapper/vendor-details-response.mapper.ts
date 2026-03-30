export const mapper = {
  response: {
    createVendor: (data: any) => ({
      message: 'Vendor created successfully',
      vendor: {
        id: data.vendorId,
        name: data.vendorName,
        type: data.vendorType,
        status: data.vendorStatus,
        email: data.email,
        phone: data.phoneNo,
        createdAt: data.created_at,
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
        id: v.vendorId,
        name: v.vendorName,
        type: v.vendorType,
        status: v.vendorStatus,
      })),
    }),

    updateVendor: (data: any) => ({
      message: 'Vendor updated successfully',
      vendor: {
        id: data.vendorId,
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
