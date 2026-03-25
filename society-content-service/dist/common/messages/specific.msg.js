"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEMO_SLOT_SCHEDULE = exports.DEMO_SLOT_MASTER = exports.GUEST_USERS = exports.CONTENT = exports.PACKAGEMAPPING = exports.CATGSERVICEMAP = exports.STATE = exports.DISTRICT = exports.GENCODE = exports.PACKAGE = exports.SERVICES = exports.SOCIETY_LEVEL = exports.AMENITY = exports.FACILITY = void 0;
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
    },
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
    },
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
    },
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
        REQUIRED: 'Id is required',
    },
    SUCCESS: {
        PACKAGE_DELETED: 'Package marked as deleted',
        PACKAGE_CREATED: 'Package created successfully',
        PACKAGE_UPDATED: 'Package updated successfully',
        PACKAGE_FETCHED: 'Package fetched successfully',
    },
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
    },
};
exports.DISTRICT = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        FETCH_FAILED: 'Unable to fetch districts',
        DISTRICT_NOT_FOUND: 'District does not exist',
    },
    SUCCESS: {
        DISTRICT_FETCHED: 'District fetched successfully',
    },
};
exports.STATE = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        FETCH_FAILED: 'Unable to fetch states',
        STATE_NOT_FOUND: 'State does not exist',
    },
    SUCCESS: {
        STATE_FETCHED: 'State fetched successfully',
    },
};
exports.CATGSERVICEMAP = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create.',
        FETCH_FAILED: 'Unable to fetch',
        MAP_NOT_FOUND: 'Mapped category and service does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        REQUIRED: 'categoryCode and serviceDetails are required',
    },
    SUCCESS: {
        CATGMAP_CREATED: 'Category and service Mapped successfully',
        CATGMAP_FETCHED: 'Mapped category and service fetched successfully',
        CATGMAP_UPDATED: 'Mapped category and service updated successfully',
        CATGMAP_DELETED: 'Mapped category and service marked as deleted',
    },
};
exports.PACKAGEMAPPING = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create.',
        FETCH_FAILED: 'Unable to fetch',
        MAP_NOT_FOUND: 'Mapped package does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        REQUIRED: 'packageId and Details are required',
    },
    SUCCESS: {
        PKGMAP_CREATED: 'Data Mapped successfully',
        PKGMAP_FETCHED: 'Mapped package and data fetched successfully',
        PKGMAP_UPDATED: 'Mapped package and data updated successfully',
        PKGMAP_DELETED: 'Mapped package and data marked as deleted',
    },
};
exports.CONTENT = {
    ERRORS: {
        INVALID_CONTENT_ID: 'Invalid Content id',
        CREATE_FAILED: 'Unable to create content',
        FETCH_FAILED: 'Unable to fetch contents',
        FETCH_ONE_FAILED: 'Unable to fetch content',
        CONTENT_NOT_FOUND: 'Content does not exist',
        UPDATE_FAILED: 'Unable to update contents details',
        DELETE_FAILED: 'Failed to delete contents',
    },
    SUCCESS: {
        CONTENT_DELETED: 'Content marked as deleted',
        CONTENT_CREATED: 'Content created successfully',
        CONTENT_UPDATED: 'Content updated successfully',
        CONTENT_FETCHED: 'Content fetched successfully',
    },
};
exports.GUEST_USERS = {
    SUCCESS: {
        GUEST_USER_CREATED: 'Guest user created successfully',
        GUEST_USER_FETCHED: 'Guest user fetched successfully',
        GUEST_USER_UPDATED: 'Guest user updated successfully',
        GUEST_USER_DELETED: 'Guest user deleted successfully',
    },
    ERRORS: {
        CREATE_FAILED: 'Failed to create guest user',
        FETCH_FAILED: 'Failed to fetch guest user',
        UPDATE_FAILED: 'Failed to update guest user',
        DELETE_FAILED: 'Failed to delete guest user',
        INVALID_GUEST_USER_ID: 'Invalid guest user id',
        GUEST_USER_NOT_FOUND: 'Guest user not found',
        DUPLICATE_GUEST_USER: 'mobile number already exists',
    },
};
exports.DEMO_SLOT_MASTER = {
    SUCCESS: {
        SLOT_CREATED: 'Demo slot created successfully.',
        SLOT_UPDATED: 'Demo slot updated successfully.',
        SLOT_DELETED: 'Demo slot deleted successfully.',
        SLOT_FETCHED: 'Demo slot fetched successfully.',
        SLOTS_FETCHED: 'Demo slots fetched successfully.',
    },
    ERRORS: {
        CREATE_FAILED: 'Failed to create demo slot.',
        UPDATE_FAILED: 'Failed to update demo slot.',
        DELETE_FAILED: 'Failed to delete demo slot.',
        FETCH_FAILED: 'Failed to fetch demo slot(s).',
        INVALID_SLOT_ID: 'Invalid demo slot ID provided.',
        SLOT_NOT_FOUND: 'Demo slot not found.',
        DUPLICATE_SLOT: 'Demo slot already exists.',
        SLOT_INTEGER: 'Only integers are allowed.',
        SLOT_INVALID: 'Invalid status only int.',
    },
};
exports.DEMO_SLOT_SCHEDULE = {
    SUCCESS: {
        SCHEDULE_CREATED: 'Demo slot schedule created successfully.',
        SCHEDULE_UPDATED: 'Demo slot schedule updated successfully.',
        SCHEDULE_DELETED: 'Demo slot schedule deleted successfully.',
        SCHEDULE_FETCHED: 'Demo slot schedule fetched successfully.',
        SCHEDULES_FETCHED: 'Demo slot schedules fetched successfully.',
    },
    ERRORS: {
        CREATE_FAILED: 'Failed to create demo slot schedule.',
        UPDATE_FAILED: 'Failed to update demo slot schedule.',
        DELETE_FAILED: 'Failed to delete demo slot schedule.',
        FETCH_FAILED: 'Failed to fetch demo slot schedule(s).',
        INVALID_SCHEDULE_ID: 'Invalid demo slot schedule ID provided.',
        SCHEDULE_NOT_FOUND: 'Demo slot schedule not found.',
        DUPLICATE_SCHEDULE: 'Demo slot schedule already exists.',
    },
};
//# sourceMappingURL=specific.msg.js.map