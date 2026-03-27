"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaRequestMapper = mediaRequestMapper;
function mediaRequestMapper(data) {
    return {
        society_id: data.societyId,
        entity_type: data.entityType,
        entity_id: data.entityId,
        media_type: data.mediaType,
        file_name: data.fileName,
        file_path: data.filePath,
        file_size: data.fileSize,
        mime_type: data.mimeType,
        file_extension: data.fileExtension,
        is_primary: data.isPrimary,
        display_order: data.displayOrder,
        status: data.status,
        metadata: data.metadata,
        deleted_at: data.deleted_at || null
    };
}
//# sourceMappingURL=media.request.mapper.js.map