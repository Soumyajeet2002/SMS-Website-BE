import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    Unique,
} from 'typeorm';

@Entity({
    name: 'user_society_map',
    schema: 'society_management',
})
@Unique('uq_user_society', ['user_id', 'society_id']) // Prevents duplicate memberships

export class UserSocietyMapEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({ type: 'uuid' })
    user_id: string;

    @Index()
    @Column({ type: 'uuid' })
    society_id: string;

    @Column({ type: 'varchar', length: 50 })
    user_role: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @Column({ type: 'uuid' })
    created_by: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @Column({ type: 'uuid', nullable: true })
    updated_by?: string;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updated_at?: Date;
}
