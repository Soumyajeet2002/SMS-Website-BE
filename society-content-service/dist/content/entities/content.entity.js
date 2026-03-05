"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentEntity = exports.ContentStatus = void 0;
const typeorm_1 = require("typeorm");
var ContentStatus;
(function (ContentStatus) {
    ContentStatus[ContentStatus["INACTIVE"] = 0] = "INACTIVE";
    ContentStatus[ContentStatus["ACTIVE"] = 1] = "ACTIVE";
    ContentStatus[ContentStatus["DELETED"] = 2] = "DELETED";
})(ContentStatus || (exports.ContentStatus = ContentStatus = {}));
let ContentEntity = class ContentEntity {
    contentId;
    societyId;
    slug;
    title;
    contentType;
    currentVersionNo;
    workingVersionNo;
    publishAt;
    expireAt;
    priority;
    isFeatured;
    status;
    createdBy;
    createdAt;
    updatedBy;
    updatedAt;
};
exports.ContentEntity = ContentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'content_id' }),
    __metadata("design:type", String)
], ContentEntity.prototype, "contentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'society_id', type: 'uuid' }),
    __metadata("design:type", String)
], ContentEntity.prototype, "societyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ContentEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ContentEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'content_type', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], ContentEntity.prototype, "contentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_version_no', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], ContentEntity.prototype, "currentVersionNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_version_no', type: 'int', default: 1 }),
    __metadata("design:type", Number)
], ContentEntity.prototype, "workingVersionNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'publish_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], ContentEntity.prototype, "publishAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expire_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], ContentEntity.prototype, "expireAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ContentEntity.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_featured', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ContentEntity.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        default: ContentStatus.ACTIVE,
        comment: '0=Inactive, 1=Active, 2=Deleted',
    }),
    __metadata("design:type", Number)
], ContentEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ContentEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ContentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ContentEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], ContentEntity.prototype, "updatedAt", void 0);
exports.ContentEntity = ContentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'contents', schema: 'society_cms' }),
    (0, typeorm_1.Index)('uq_content_slug_active', ['slug'], {
        unique: true,
        where: `"status" = 1`,
    }),
    (0, typeorm_1.Index)('idx_contents_status', ['status']),
    (0, typeorm_1.Index)('idx_contents_society', ['societyId'])
], ContentEntity);
//# sourceMappingURL=content.entity.js.map