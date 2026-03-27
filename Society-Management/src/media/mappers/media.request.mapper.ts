
export function mediaRequestMapper(data: any) {
    return {
        society_id: data.societyId,

        /* ---------- Polymorphic ---------- */
        entity_type: data.entityType,
        entity_id: data.entityId,

        /* ---------- Media ---------- */
        media_type: data.mediaType,
        file_name: data.fileName,
        file_path: data.filePath,
        file_size: data.fileSize,
        mime_type: data.mimeType,
        file_extension: data.fileExtension,

        /* ---------- Display ---------- */
        is_primary: data.isPrimary,
        display_order: data.displayOrder,

        /* ---------- Status ---------- */
        status: data.status,

        /* ---------- Metadata ---------- */
        metadata: data.metadata,
        deleted_at: data.deleted_at || null
    };
}
