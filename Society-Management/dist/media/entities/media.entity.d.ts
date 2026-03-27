export declare class mediaEntity {
    id: string;
    society_id: string;
    entity_type: string;
    entity_id: string;
    media_type: number;
    file_name: string;
    file_path: string;
    file_size?: string;
    mime_type?: string;
    file_extension?: string;
    is_primary: boolean;
    display_order: number;
    status: number;
    deleted_at?: Date;
    metadata: Record<string, any>;
    created_at: Date;
    updated_at: Date;
}
