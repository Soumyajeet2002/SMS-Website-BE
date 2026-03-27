"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCIETYAMENITYMAP = exports.SOCIETYADMIN = exports.MEDIA = exports.FLAT = exports.PACKAGETIERMAP = exports.CATGAMENITYMAP = exports.AMENITYTIERCATGMAP = exports.USERRESIDENTMAP = exports.USERSOCIETYMAP = exports.SOCIETY = void 0;
exports.SOCIETY = {
    ERRORS: {
        INVALID_SOCIETY_ID: 'Invalid facility id',
        CREATE_FAILED: 'Unable to create SOCIETY',
        FETCH_FAILED: 'Unable to fetch societies',
        FETCH_ONE_FAILED: 'Unable to fetch SOCIETY',
        SOCIETY_NOT_FOUND: 'SOCIETY does not exist',
        UPDATE_FAILED: 'Unable to update societies details',
        DELETE_FAILED: 'Failed to delete societies',
    },
    SUCCESS: {
        SOCIETY_DELETED: 'SOCIETY marked as deleted',
        SOCIETY_CREATED: 'SOCIETY created successfully',
        SOCIETY_UPDATED: 'SOCIETY updated successfully',
        SOCIETY_FETCHED: 'SOCIETY fetched successfully',
    }
};
exports.USERSOCIETYMAP = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create mapped uses',
        FETCH_FAILED: 'Unable to fetch',
        MAP_NOT_FOUND: 'Mapped user does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        ALREADY_MAPPED: 'User already mapped to this society',
    },
    SUCCESS: {
        USERMAP_CREATED: 'Mapped user created successfully',
        USERMAP_FETCHED: 'Mapped user fetched successfully',
        USERMAP_UPDATED: 'Mapped user updated successfully',
        USERMAP_DELETED: 'Mapped user marked as deleted',
    }
};
exports.USERRESIDENTMAP = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to insert resident Details',
        FETCH_FAILED: 'Unable to fetch resident details',
        UPDATE_FAILED: 'Unable to update resident details',
        DELETE_FAILED: 'Failed to delete resident details',
    },
    SUCCESS: {
        RESIDENT_CREATED: 'Resident details inserted successfully',
        RESIDENT_FETCHED: 'Resident details fetched successfully',
        RESIDENT_UPDATED: 'Resident details updated successfully',
        RESIDENT_DELETED: 'Resident details marked as deleted',
    }
};
exports.AMENITYTIERCATGMAP = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create.',
        FETCH_FAILED: 'Unable to fetch',
        MAP_NOT_FOUND: 'Mapped Tier category does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        REQUIRED: 'tierCode and categoryDetails are required'
    },
    SUCCESS: {
        USERMAP_CREATED: 'Tier and category mapped successfully',
        USERMAP_FETCHED: 'Mapped tier and category fetched successfully',
        USERMAP_UPDATED: 'Mapped tier and category updated successfully',
        USERMAP_DELETED: 'Mapped tier and category marked as deleted',
    }
};
exports.CATGAMENITYMAP = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create.',
        FETCH_FAILED: 'Unable to fetch',
        MAP_NOT_FOUND: 'Mapped category and amenity does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        REQUIRED: 'categoryCode and amenityDetails are required'
    },
    SUCCESS: {
        CATGMAP_CREATED: 'Category and amenity Mapped successfully',
        CATGMAP_FETCHED: 'Mapped category and amenity fetched successfully',
        CATGMAP_UPDATED: 'Mapped category and amenity updated successfully',
        CATGMAP_DELETED: 'Mapped category and amenity marked as deleted',
    }
};
exports.PACKAGETIERMAP = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create.',
        FETCH_FAILED: 'Unable to fetch',
        MAP_NOT_FOUND: 'Mapped package does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        REQUIRED: 'packageId and tierDetails are required'
    },
    SUCCESS: {
        PKGTIERMAP_CREATED: 'Package and tier Mapped successfully',
        PKGTIERMAP_FETCHED: 'Mapped package and tier fetched successfully',
        PKGTIERMAP_UPDATED: 'Mapped package and tier updated successfully',
        PKGTIERMAP_DELETED: 'Mapped package and tier marked as deleted',
    }
};
exports.FLAT = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create flat',
        FETCH_FAILED: 'Unable to fetch',
        FLAT_NOT_FOUND: 'Flat does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        REQUIRED: 'Flat listing id is required',
    },
    SUCCESS: {
        FLAT_CREATED: 'Flat created successfully',
        FLAT_FETCHED: 'Flat details fetched successfully',
        FLAT_UPDATED: 'Flat details updated successfully',
        FLAT_DELETED: 'Flat marked as deleted',
    }
};
exports.MEDIA = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create media.',
        FETCH_FAILED: 'Unable to fetch media details',
        MEDIA_NOT_FOUND: 'Media does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        REQUIRED: 'Media id is required',
    },
    SUCCESS: {
        MEDIA_CREATED: 'Media created successfully',
        MEDIA_FETCHED: 'Media records fetched successfully',
        MEDIA_UPDATED: 'Media record updated successfully',
        MEDIA_DELETED: 'Media marked as deleted',
    }
};
exports.SOCIETYADMIN = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        FETCH_FAILED: 'Unable to fetch details',
        SOCADMN_NOT_FOUND: 'Data does not exist',
        REQUIRED: 'id is required',
    },
    SUCCESS: {
        SOCADMN_FETCHED: 'Records fetched successfully'
    }
};
exports.SOCIETYAMENITYMAP = {
    ERRORS: {
        INVALID_ID: 'Invalid id',
        CREATE_FAILED: 'Unable to create.',
        FETCH_FAILED: 'Unable to fetch',
        MAP_NOT_FOUND: 'Mapped package does not exist',
        UPDATE_FAILED: 'Unable to update details',
        DELETE_FAILED: 'Failed to delete',
        REQUIRED: 'societyId and amenityDetails are required'
    },
    SUCCESS: {
        SOCAMNT_CREATED: 'Society and amenity Mapped successfully',
        SOCAMNT_FETCHED: 'Mapped society and amenity fetched successfully',
        SOCAMNT_UPDATED: 'Mapped society and amenity updated successfully',
        SOCAMNT_PARTIAL: 'Some society amenity mappings were created and some were updated.',
        SOCAMNT_DELETED: 'Mapped society and amenity marked as deleted',
    }
};
//# sourceMappingURL=specific.msg.js.map