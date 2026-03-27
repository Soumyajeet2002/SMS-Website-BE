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
exports.SocietyAmenityMappingsEntity = void 0;
const typeorm_1 = require("typeorm");
let SocietyAmenityMappingsEntity = class SocietyAmenityMappingsEntity {
    id;
    society_id;
    amenity_id;
    status;
    created_by;
    created_at;
    updated_by;
    updated_at;
};
exports.SocietyAmenityMappingsEntity = SocietyAmenityMappingsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SocietyAmenityMappingsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], SocietyAmenityMappingsEntity.prototype, "society_id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], SocietyAmenityMappingsEntity.prototype, "amenity_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 1 }),
    __metadata("design:type", Number)
], SocietyAmenityMappingsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], SocietyAmenityMappingsEntity.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], SocietyAmenityMappingsEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], SocietyAmenityMappingsEntity.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SocietyAmenityMappingsEntity.prototype, "updated_at", void 0);
exports.SocietyAmenityMappingsEntity = SocietyAmenityMappingsEntity = __decorate([
    (0, typeorm_1.Entity)({ schema: 'society_management', name: 'society_amenity_mappings' }),
    (0, typeorm_1.Unique)(['society_id', 'amenity_id'])
], SocietyAmenityMappingsEntity);
//# sourceMappingURL=society-amenity-map.entities.js.map