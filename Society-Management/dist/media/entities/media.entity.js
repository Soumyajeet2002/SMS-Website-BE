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
exports.mediaEntity = void 0;
const typeorm_1 = require("typeorm");
let mediaEntity = class mediaEntity {
    id;
    society_id;
    entity_type;
    entity_id;
    media_type;
    file_name;
    file_path;
    file_size;
    mime_type;
    file_extension;
    is_primary;
    display_order;
    status;
    deleted_at;
    metadata;
    created_at;
    updated_at;
};
exports.mediaEntity = mediaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], mediaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], mediaEntity.prototype, "society_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], mediaEntity.prototype, "entity_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], mediaEntity.prototype, "entity_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint' }),
    __metadata("design:type", Number)
], mediaEntity.prototype, "media_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], mediaEntity.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], mediaEntity.prototype, "file_path", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    __metadata("design:type", String)
], mediaEntity.prototype, "file_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], mediaEntity.prototype, "mime_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], mediaEntity.prototype, "file_extension", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], mediaEntity.prototype, "is_primary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], mediaEntity.prototype, "display_order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 1 }),
    __metadata("design:type", Number)
], mediaEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], mediaEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        default: () => "'{}'",
    }),
    __metadata("design:type", Object)
], mediaEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], mediaEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], mediaEntity.prototype, "updated_at", void 0);
exports.mediaEntity = mediaEntity = __decorate([
    (0, typeorm_1.Entity)({
        schema: 'society_management',
        name: 'society_media',
    }),
    (0, typeorm_1.Index)('idx_media_society', ['society_id']),
    (0, typeorm_1.Index)('idx_media_entity', ['entity_type', 'entity_id']),
    (0, typeorm_1.Index)('idx_media_status', ['status']),
    (0, typeorm_1.Index)('idx_media_deleted', ['deleted_at'])
], mediaEntity);
//# sourceMappingURL=media.entity.js.map