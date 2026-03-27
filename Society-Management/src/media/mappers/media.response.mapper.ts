export function mediaResponseMapper(entity: any): any {
    if (Array.isArray(entity)) {
        return entity.map(mediaResponseMapper);
    }

    if (!entity) return [];

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
};
