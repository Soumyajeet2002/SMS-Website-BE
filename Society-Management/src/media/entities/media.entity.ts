import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

@Entity({
    schema: 'society_management',
    name: 'society_media',
})
@Index('idx_media_society', ['society_id'])
@Index('idx_media_entity', ['entity_type', 'entity_id'])
@Index('idx_media_status', ['status'])
@Index('idx_media_deleted', ['deleted_at'])
export class mediaEntity {
    /* ---------------- Primary ---------------- */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /* ---------------- Multi-Society ---------------- */
    @Column({ type: 'uuid' })
    society_id: string;

    /* ---------------- Polymorphic Mapping ---------------- */
    @Column({ length: 50 })
    entity_type: string;

    @Column({ type: 'uuid' })
    entity_id: string;

    /* ---------------- Media Info ---------------- */
    @Column({ type: 'smallint' })
    media_type: number; // 1=image, 2=video, 3=document, 4=audio

    @Column({ length: 255 })
    file_name: string;

    @Column({ type: 'text' })
    file_path: string;

    @Column({ type: 'bigint', nullable: true })
    file_size?: string;

    @Column({ length: 100, nullable: true })
    mime_type?: string;

    @Column({ length: 20, nullable: true })
    file_extension?: string;

    /* ---------------- Display ---------------- */
    @Column({ type: 'boolean', default: false })
    is_primary: boolean;

    @Column({ type: 'integer', default: 0 })
    display_order: number;

    /* ---------------- Status ---------------- */
    @Column({ type: 'smallint', default: 1 })
    status: number;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at?: Date;

    /* ---------------- Metadata ---------------- */
    @Column({
        type: 'jsonb',
        default: () => "'{}'",
    })
    metadata: Record<string, any>;

    /* ---------------- Audit ---------------- */
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
