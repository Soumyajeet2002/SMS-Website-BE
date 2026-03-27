import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
} from 'typeorm';

@Entity({
    name: 'category_amenity_map',
    schema: 'society_management',
})
@Unique('uq_category_amenity', ['category_code', 'amenity_id'])
export class CategoryAmenityMapEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    category_code: string;

    @Column({
        type: 'uuid',
        nullable: false,
    })
    amenity_id: string;

    @Column({
        type: 'int',
        default: 0,
    })
    display_order: number;

    @Column({
        type: 'smallint',
        default: 1,
    })
    status: number;

    @Column({
        type: 'jsonb',
        default: () => "'{}'::jsonb",
    })
    metadata: Record<string, any>;

    @Column({
        type: 'uuid',
        nullable: false,
    })
    created_by: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'NOW()',
    })
    created_at: Date;

    @Column({
        type: 'uuid',
        nullable: true,
    })
    updated_by: string | null;

    @UpdateDateColumn({
        type: 'timestamptz',
        nullable: true,
    })
    updated_at: Date | null;
}
