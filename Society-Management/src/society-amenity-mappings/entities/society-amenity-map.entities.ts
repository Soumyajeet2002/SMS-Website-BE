import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
} from 'typeorm';

@Entity({ schema: 'society_management', name:'society_amenity_mappings' })
@Unique(['society_id', 'amenity_id'])
export class SocietyAmenityMappingsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    society_id: string;

    @Column('uuid')
    amenity_id: string;

    // 1 = Active
    // 0 = Inactive
    // 2 = Deleted / Archived
    @Column({ type: 'smallint', default: 1 })
    status: number;

    @Column('uuid')
    created_by: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @Column('uuid', { nullable: true })
    updated_by: string;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updated_at: Date;
}