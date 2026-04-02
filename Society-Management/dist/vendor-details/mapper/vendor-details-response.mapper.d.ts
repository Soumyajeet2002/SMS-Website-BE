export declare const mapper: {
    response: {
        createVendor: (data: any) => {
            message: string;
            vendor: {
                vendorId: any;
                societyId: any;
                name: any;
                type: any;
                status: any;
                email: any;
                phone: any;
                createdAt: any;
                createdBy: any;
            };
        };
        getAllVendors: (data: any[], meta: any) => {
            message: string;
            meta: {
                page: any;
                limit: any;
                total: any;
                totalPages: any;
            };
            vendors: {
                vendorId: any;
                societyId: any;
                name: any;
                type: any;
                status: any;
            }[];
        };
        updateVendor: (data: any) => {
            message: string;
            vendor: {
                vendorId: any;
                societyId: any;
                name: any;
                type: any;
                status: any;
                email: any;
                phone: any;
                updatedAt: any;
            };
        };
    };
};
