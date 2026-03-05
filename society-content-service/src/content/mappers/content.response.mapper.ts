// mappers/content.response.mapper.ts

import { ContentEntity } from '../entities/content.entity';

export const contentResponseMapper = (data: ContentEntity) => ({
  contentId: data.contentId,
  societyId: data.societyId,
  slug: data.slug,
  title: data.title,
  contentType: data.contentType,
  currentVersionNo: data.currentVersionNo,
  workingVersionNo: data.workingVersionNo,
  publishAt: data.publishAt,
  expireAt: data.expireAt,
  priority: data.priority,
  isFeatured: data.isFeatured,
  // metadata: data.metadata,
  status: data.status,

  // createdBy: data.createdBy,
  // createdAt: data.createdAt,
  // updatedBy: data.updatedBy,
  // updatedAt: data.updatedAt,
});
