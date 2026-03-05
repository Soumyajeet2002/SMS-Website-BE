"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACKAGEMAPPING = exports.CATGSERVICEMAP = exports.STATE = exports.DISTRICT = exports.GENCODE = exports.PACKAGE = exports.SERVICES = exports.SOCIETY_LEVEL = exports.AMENITY = exports.FACILITY = void 0;
exports.FACILITY = {
    ERRORS: {
        INVALID_FACILITY_ID: 'Invalid facility id',
        CREATE_FAILED: 'Unable to create facility',
        FETCH_FAILED: 'Unable to fetch facilities',
        FETCH_ONE_FAILED: 'Unable to fetch facility',
        FACILITY_NOT_FOUND: 'Facility does not exist',
        UPDATE_FAILED: 'Unable to update facility details',
        DELETE_FAILED: 'Failed to delete facility',
    },
    SUCCESS: {
        FACILITY_DELETED: 'Facility marked as deleted',
        FACILITY_CREATED: 'Facility created successfully',
        FACILITY_UPDATED: 'Facility updated successfully',
        FACILITY_FETCHED: 'Facility fetched successfully',
    }
};
exports.AMENITY = {
    ERRORS: {
        INVALID_AMENITY_ID: 'Invalid facility id',
        CREATE_FAILED: 'Unable to create amenity',
        FETCH_FAILED: 'Unable to fetch amenities',
        FETCH_ONE_FAILED: 'Unable to fetch amenity',
        AMENITY_NOT_FOUND: 'Amenity does not exist',
        UPDATE_FAILED: 'Unable to update amenities details',
        DELETE_FAILED: 'Failed to delete amenities',
    },
    SUCCESS: {
        AMENITY_DELETED: 'Amenity marked as deleted',
        AMENITY_CREATED: 'Amenity created successfully',
        AMENITY_UPDATED: 'Amenity updated successfully',
        AMENITY_FETCHED: 'Amenity fetched successfully',
    }
};
exports.SOCIETY_LEVEL = {
    ERRORS: {
        FETCH_FAILED: 'Unable to fetch society levels',
        FETCH_ONE_FAILED: 'Unable to fetch society level',
        CREATE_FAILED: 'Unable to create society level',
        UPDATE_FAILED: 'Unable to update society level',
        DELETE_FAILED: 'Unable to delete society level',
        NOT_FOUND: 'Society level not found',
        DUPLICATE_CODE: 'Level code already exists',
    },
    SUCCESS: {
        FETCHED: 'Society levels fetched successfully',
        CREATED: 'Society level created successfully',
        UPDATED: 'Society level updated successfully',
        DELETED: 'Society level deleted successfully',
    },
};
exports.SERVICES = {
    ERRORS: {
        INVALID_FACILITY_ID: 'Invalid sevice id',
        CREATE_FAILED: 'Unable to create service',
        FETCH_FAILED: 'Unable to fetch services',
        FETCH_ONE_FAILED: 'Unable to fetch service',
        FACILITY_NOT_FOUND: 'Service does not exist',
        UPDATE_FAILED: 'Unable to update service details',
        DELETE_FAILED: 'Failed to delete service',
    },
    SUCCESS: {
        SERVICE_DELETED: 'Service marked as deleted',
        SERVICE_CREATED: 'Service created successfully',
        SERVICE_UPDATED: 'Service updated successfully',
        SERVICE_FETCHED: 'Service fetched successfully',
    }
};
exports.PACKAGE = {
    ERRORS: {
        INVALID_PACKAGE_ID: 'Invalid package id',
        CREATE_FAILED: 'Unable to create package',
        FETCH_FAILED: 'Unable to fetch packages',
        FETCH_ONE_FAILED: 'Unable to fetch package',
        PACKAGE_NOT_FOUND: 'Package does not exist',
        UPDATE_FAILED: 'Unable to update package details',
        DELETE_FAILED: 'Failed to delete package',
        REQUIRED: 'Id is required'
    },
    SUCCESS: {
        PACKAGE_DELETED: 'Package marked as deleted',
        PACKAGE_CREATED: 'Package created successfully',
        PACKAGE_UPDATED: 'Package updated successfully',
        PACKAGE_FETCHED: 'Package fetched successfully',
    }
};
exports.GENCODE = {
    ERRORS: {
        INVALID_GENCODE_ID: 'Invalid gencode id',
        CREATE_FAILED: 'Unable to create gencode',
        FETCH_FAILED: 'Unable to fetch gencode',
        FETCH_ONE_FAILED: 'Unable to fetch gencode',
        GENCODE_NOT_FOUND: 'Gencode does not exist',
        UPDATE_FAILED: 'Unable to update gencode details',
        DELETE_FAILED: 'Failed to delete gencode',
    },
    SUCCESS: {
        GENCODE_DELETED: 'Gencode marked as deleted',
        GENCODE_CREATED: 'Gencode created successfully',
        GENCODE_UPDATED: 'Gencode updated successfully',
        GENCODE_FETCHED: 'Gencode fetched successfully',
    }
};
exports.DISTRICT = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        FETCH_FAILED: 'Unable to fetch districts',
        DISTRICT_NOT_FOUND: 'District does not exist'
    },
    SUCCESS: {
        DISTRICT_FETCHED: 'District fetched successfully',
    }
};
exports.STATE = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        FETCH_FAILED: 'Unable to fetch states',
        STATE_NOT_FOUND: 'State does not exist'
    },
    SUCCESS: {
        STATE_FETCHED: 'State fetched successfully',
    }
};
exports.CATGSERVICEMAP = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create.',
        FETCH_FAILED: 'Unable to fetch',
        MAP_NOT_FOUND: 'Mapped category and service does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        REQUIRED: 'categoryCode and serviceDetails are required'
    },
    SUCCESS: {
        CATGMAP_CREATED: 'Category and service Mapped successfully',
        CATGMAP_FETCHED: 'Mapped category and service fetched successfully',
        CATGMAP_UPDATED: 'Mapped category and service updated successfully',
        CATGMAP_DELETED: 'Mapped category and service marked as deleted',
    }
};
exports.PACKAGEMAPPING = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create.',
        FETCH_FAILED: 'Unable to fetch',
        MAP_NOT_FOUND: 'Mapped package does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        REQUIRED: 'packageId and Details are required'
    },
    SUCCESS: {
        PKGMAP_CREATED: 'Data Mapped successfully',
        PKGMAP_FETCHED: 'Mapped package and data fetched successfully',
        PKGMAP_UPDATED: 'Mapped package and data updated successfully',
        PKGMAP_DELETED: 'Mapped package and data marked as deleted',
    }
};
//# sourceMappingURL=specific.msg.js.map