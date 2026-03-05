// entities/content.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * Status Convention
 * 0 = Inactive
 * 1 = Active
 * 2 = Deleted (Soft Delete)
 */
export enum ContentStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  DELETED = 2,
}

@Entity({ name: 'contents', schema: 'society_cms' })
/* Slug should be unique only for Active records */
@Index('uq_content_slug_active', ['slug'], {
  unique: true,
  where: `"status" = 1`,
})
/* Helpful index for filtering */
@Index('idx_contents_status', ['status'])
/* Helpful index for society based filtering */
@Index('idx_contents_society', ['societyId'])
export class ContentEntity {
  /* Primary Key */
  @PrimaryGeneratedColumn('uuid', { name: 'content_id' })
  contentId: string;

  /* Foreign Scope */
  @Column({ name: 'society_id', type: 'uuid' })
  societyId: string;

  /* Business Fields */

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'content_type', type: 'varchar', length: 50 })
  contentType: string;

  @Column({ name: 'current_version_no', type: 'int', default: 1 })
  currentVersionNo: number;

  @Column({ name: 'working_version_no', type: 'int', default: 1 })
  workingVersionNo: number;

  @Column({ name: 'publish_at', type: 'timestamptz', nullable: true })
  publishAt?: Date;

  @Column({ name: 'expire_at', type: 'timestamptz', nullable: true })
  expireAt?: Date;

  @Column({ type: 'int', default: 0 })
  priority: number;

  @Column({ name: 'is_featured', type: 'boolean', default: false })
  isFeatured: boolean;

  /**
   * Status Field
   * Replaces isActive + isDeleted
   */
  @Column({
    type: 'smallint',
    default: ContentStatus.ACTIVE,
    comment: '0=Inactive, 1=Active, 2=Deleted',
  })
  status: ContentStatus;

  /* Optional JSON Metadata */
  // @Column({ type: 'jsonb', nullable: true })
  // metadata?: Record<string, any>;

  /* Audit Fields */

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt?: Date;
}
