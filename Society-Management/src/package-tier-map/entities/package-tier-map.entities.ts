import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
} from 'typeorm';

@Entity({
    schema: 'society_management',
    name: 'package_tier_map'
})
@Unique('uq_package_tier', ['package_id', 'tier_code'])
export class PackageTierMapEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid' })
    package_id: string;

    @Column({ type: 'varchar', length: 50 })
    tier_code: string;

    @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
    tier_price: string;

    @Column({ type: 'boolean', default: true })
    is_included: boolean;

    @Column({ type: 'smallint', default: 1 })
    status: number;

    @Column({ type: 'uuid' })
    created_by: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @Column({ type: 'uuid', nullable: true })
    updated_by: string | null;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updated_at: Date | null;
}
