import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SocietySetupDetailsEntity } from './society-details.entity';

@Entity({
  schema: 'society_management',
  name: 'society_blocks',
})
export class SocietyBlockEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'block_id' })
  blockId: string;

  @Column({ name: 'society_id', type: 'uuid' })
  societyId: string;


  @ManyToOne(
  () => SocietySetupDetailsEntity,
  (society) => society.blocks,
)
@JoinColumn({ name: 'society_id' })
society: SocietySetupDetailsEntity;

  @Column({ name: 'block_name', length: 100 })
  blockName: string;

  @Column({ name: 'block_code', length: 50 })
  blockCode: string;

  @Column({ name: 'total_floors', type: 'int', default: 0 })
  totalFloors: number;

  @Column({ name: 'total_flats', type: 'int', default: 0 })
  totalFlats: number;

  @Column({ name: 'parking_slot', type: 'int', default: 0 })
  parkingSlot: number;

  @Column({ name: 'block_type', length: 50, nullable: true })
  blockType?: string;

  @Column({
    name: 'status',
    type: 'smallint',
    default: 1,
  })
  status: number;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @Column({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;

  @Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;
}