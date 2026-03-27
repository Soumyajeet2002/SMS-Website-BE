import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

@Entity({ name: 'society_flat_listings', schema: 'society_management' })
@Index(['society_id'])
@Index(['member_id'])
@Index(['status'])
@Index(['deleted_at'])
export class societyFlatListingEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    society_id: string;

    @Column({ type: 'uuid', nullable: true })
    member_id?: string;

    /* ---------- Basic Info ---------- */
    @Column({ length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'date', nullable: true })
    available_from?: string;

    /* ---------- Pricing ---------- */
    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
    rent_amount?: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
    security_deposit?: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
    maintenance_amount?: string;

    @Column({ type: 'boolean', default: false })
    rent_negotiable: boolean;

    /* ---------- Property Details ---------- */
    @Column({ length: 50, nullable: true })
    flat_type?: string;

    @Column({ type: 'smallint', nullable: true })
    bedrooms?: number;

    @Column({ type: 'smallint', nullable: true })
    bathrooms?: number;

    @Column({ type: 'smallint', nullable: true })
    balconies?: number;

    @Column({ length: 50, nullable: true })
    furnishing_type?: string;

    @Column({ type: 'integer', nullable: true })
    carpet_area?: number;

    @Column({ length: 20, nullable: true })
    area_unit?: string;

    /* ---------- Location ---------- */
    @Column({ type: 'integer' })
    country_code: number;

    @Column({ type: 'integer' })
    state_code: number;

    @Column({ type: 'integer' })
    district_code: number;

    @Column({ length: 150, nullable: true })
    locality?: string;

    @Column({ length: 10, nullable: true })
    pincode?: string;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    latitude?: string;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    longitude?: string;

    /* ---------- Contact ---------- */
    @Column({ length: 150, nullable: true })
    contact_name?: string;

    @Column({ length: 15, nullable: true })
    primary_mobile?: string;

    @Column({ length: 15, nullable: true })
    alternate_mobile?: string;

    @Column({ length: 150, nullable: true })
    email?: string;

    @Column({ type: 'boolean', default: false })
    whatsapp_available: boolean;

    @Column({ length: 100, nullable: true })
    preferred_contact_time?: string;

    /* ---------- Visibility ---------- */
    @Column({ type: 'boolean', default: true })
    is_public: boolean;

    @Column({ type: 'boolean', default: false })
    is_featured: boolean;

    @Column({ type: 'boolean', default: false })
    show_exact_address: boolean;

    @Column({ type: 'boolean', default: true })
    is_contact_public: boolean;

    /* ---------- Status ---------- */
    @Column({ type: 'smallint', default: 0 })
    status: number;

    @Column({ type: 'timestamp', nullable: true })
    expires_at?: Date;

    @Column({ type: 'timestamp', nullable: true })
    published_at?: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at?: Date;

    /* ---------- JSONB ---------- */
    @Column({
        type: 'jsonb',
        default: () => "'{}'",
    })
    details: Record<string, any>;

    /* ---------- Audit ---------- */
    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updated_at?: Date;
}
