import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique
} from 'typeorm';

@Entity({
    name: 'amenity_tier_category_map',
    schema: 'society_management'
})
@Unique('uq_tier_category', ['tier_code', 'category_code'])
export class TierCategoryMapEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    tier_code: string;

    @Column({ type: 'varchar', length: 50 })
    category_code: string;

    @Column({
        type: 'int',
        default: 0
    })
    display_order: number;

    @Column({
        type: 'smallint',
        default: 1
    })
    status: number;

    @Column({ type: 'uuid' })
    created_by: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @Column({
        type: 'uuid',
        nullable: true
    })
    updated_by?: string;

    @UpdateDateColumn({
        type: 'timestamptz',
        nullable: true
    })
    updated_at?: Date;
}
