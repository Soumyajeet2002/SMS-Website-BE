"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentResponseMapper = void 0;
const contentResponseMapper = (data) => ({
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
    status: data.status,
});
exports.contentResponseMapper = contentResponseMapper;
//# sourceMappingURL=content.response.mapper.js.map