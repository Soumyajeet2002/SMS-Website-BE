"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaResponseMapper = mediaResponseMapper;
function mediaResponseMapper(entity) {
    if (Array.isArray(entity)) {
        return entity.map(mediaResponseMapper);
    }
    if (!entity)
        return [];
    return {
        id: entity.id,
        mediaType: entity.media_type,
        fileName: entity.file_name,
        filePath: entity.file_path,
        fileSize: entity.file_size,
        mimeType: entity.mime_type,
        fileExtension: entity.file_extension,
        isPrimary: entity.is_primary,
        displayOrder: entity.display_order,
        status: entity.status,
        deletedAt: entity.deleted_at,
        metadata: entity.metadata
    };
}
;
//# sourceMappingURL=media.response.mapper.js.map