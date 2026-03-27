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
exports.TierCategoryMapEntity = void 0;
const typeorm_1 = require("typeorm");
let TierCategoryMapEntity = class TierCategoryMapEntity {
    id;
    tier_code;
    category_code;
    display_order;
    status;
    created_by;
    created_at;
    updated_by;
    updated_at;
};
exports.TierCategoryMapEntity = TierCategoryMapEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TierCategoryMapEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TierCategoryMapEntity.prototype, "tier_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TierCategoryMapEntity.prototype, "category_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], TierCategoryMapEntity.prototype, "display_order", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        default: 1
    }),
    __metadata("design:type", Number)
], TierCategoryMapEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], TierCategoryMapEntity.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], TierCategoryMapEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid',
        nullable: true
    }),
    __metadata("design:type", String)
], TierCategoryMapEntity.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        nullable: true
    }),
    __metadata("design:type", Date)
], TierCategoryMapEntity.prototype, "updated_at", void 0);
exports.TierCategoryMapEntity = TierCategoryMapEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'amenity_tier_category_map',
        schema: 'society_management'
    }),
    (0, typeorm_1.Unique)('uq_tier_category', ['tier_code', 'category_code'])
], TierCategoryMapEntity);
//# sourceMappingURL=amenity-tier-category-map.entities.js.map