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
exports.societyFlatListingEntity = void 0;
const typeorm_1 = require("typeorm");
let societyFlatListingEntity = class societyFlatListingEntity {
    id;
    society_id;
    member_id;
    title;
    description;
    available_from;
    rent_amount;
    security_deposit;
    maintenance_amount;
    rent_negotiable;
    flat_type;
    bedrooms;
    bathrooms;
    balconies;
    furnishing_type;
    carpet_area;
    area_unit;
    country_code;
    state_code;
    district_code;
    locality;
    pincode;
    latitude;
    longitude;
    contact_name;
    primary_mobile;
    alternate_mobile;
    email;
    whatsapp_available;
    preferred_contact_time;
    is_public;
    is_featured;
    show_exact_address;
    is_contact_public;
    status;
    expires_at;
    published_at;
    deleted_at;
    details;
    created_at;
    updated_at;
};
exports.societyFlatListingEntity = societyFlatListingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "society_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "member_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "available_from", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "rent_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "security_deposit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "maintenance_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], societyFlatListingEntity.prototype, "rent_negotiable", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "flat_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', nullable: true }),
    __metadata("design:type", Number)
], societyFlatListingEntity.prototype, "bedrooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', nullable: true }),
    __metadata("design:type", Number)
], societyFlatListingEntity.prototype, "bathrooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', nullable: true }),
    __metadata("design:type", Number)
], societyFlatListingEntity.prototype, "balconies", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "furnishing_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: true }),
    __metadata("design:type", Number)
], societyFlatListingEntity.prototype, "carpet_area", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "area_unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], societyFlatListingEntity.prototype, "country_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], societyFlatListingEntity.prototype, "state_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], societyFlatListingEntity.prototype, "district_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "locality", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "pincode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 8, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 8, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "contact_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "primary_mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "alternate_mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], societyFlatListingEntity.prototype, "whatsapp_available", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], societyFlatListingEntity.prototype, "preferred_contact_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], societyFlatListingEntity.prototype, "is_public", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], societyFlatListingEntity.prototype, "is_featured", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], societyFlatListingEntity.prototype, "show_exact_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], societyFlatListingEntity.prototype, "is_contact_public", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', default: 0 }),
    __metadata("design:type", Number)
], societyFlatListingEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], societyFlatListingEntity.prototype, "expires_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], societyFlatListingEntity.prototype, "published_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], societyFlatListingEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        default: () => "'{}'",
    }),
    __metadata("design:type", Object)
], societyFlatListingEntity.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], societyFlatListingEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], societyFlatListingEntity.prototype, "updated_at", void 0);
exports.societyFlatListingEntity = societyFlatListingEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'society_flat_listings', schema: 'society_management' }),
    (0, typeorm_1.Index)(['society_id']),
    (0, typeorm_1.Index)(['member_id']),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['deleted_at'])
], societyFlatListingEntity);
//# sourceMappingURL=society-flat-listing.entity.js.map