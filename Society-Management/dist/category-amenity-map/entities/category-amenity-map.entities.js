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
exports.CategoryAmenityMapEntity = void 0;
const typeorm_1 = require("typeorm");
let CategoryAmenityMapEntity = class CategoryAmenityMapEntity {
    id;
    category_code;
    amenity_id;
    display_order;
    status;
    metadata;
    created_by;
    created_at;
    updated_by;
    updated_at;
};
exports.CategoryAmenityMapEntity = CategoryAmenityMapEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CategoryAmenityMapEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], CategoryAmenityMapEntity.prototype, "category_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid',
        nullable: false,
    }),
    __metadata("design:type", String)
], CategoryAmenityMapEntity.prototype, "amenity_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], CategoryAmenityMapEntity.prototype, "display_order", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        default: 1,
    }),
    __metadata("design:type", Number)
], CategoryAmenityMapEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        default: () => "'{}'::jsonb",
    }),
    __metadata("design:type", Object)
], CategoryAmenityMapEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid',
        nullable: false,
    }),
    __metadata("design:type", String)
], CategoryAmenityMapEntity.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'NOW()',
    }),
    __metadata("design:type", Date)
], CategoryAmenityMapEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid',
        nullable: true,
    }),
    __metadata("design:type", Object)
], CategoryAmenityMapEntity.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        nullable: true,
    }),
    __metadata("design:type", Object)
], CategoryAmenityMapEntity.prototype, "updated_at", void 0);
exports.CategoryAmenityMapEntity = CategoryAmenityMapEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'category_amenity_map',
        schema: 'society_management',
    }),
    (0, typeorm_1.Unique)('uq_category_amenity', ['category_code', 'amenity_id'])
], CategoryAmenityMapEntity);
//# sourceMappingURL=category-amenity-map.entities.js.map