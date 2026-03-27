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
exports.SocietySetupDetailsEntity = void 0;
const typeorm_1 = require("typeorm");
const society_block_entity_1 = require("./society-block.entity");
let SocietySetupDetailsEntity = class SocietySetupDetailsEntity {
    societyId;
    societyName;
    societyCode;
    registrationNumber;
    societyType;
    societyLevelId;
    societyLevelCode;
    establishmentYear;
    totalArea;
    infrastructureDetails;
    blocks;
    addressLine1;
    areaLocality;
    city;
    districtCode;
    stateCode;
    pincode;
    landmark;
    adminName;
    adminMobile;
    adminEmail;
    packageId;
    status;
    onboardingDate;
    createdBy;
    createdAt;
    updatedBy;
    updatedAt;
    isDeleted;
};
exports.SocietySetupDetailsEntity = SocietySetupDetailsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'society_id' }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "societyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'society_name', length: 150 }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "societyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'society_code', length: 50, unique: true }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "societyCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_number', length: 100, unique: true }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "registrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'society_type', length: 50 }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "societyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'society_level_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "societyLevelId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'society_level_code', length: 20, nullable: true }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "societyLevelCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'establishment_year', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], SocietySetupDetailsEntity.prototype, "establishmentYear", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_area',
        type: 'numeric',
        precision: 12,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], SocietySetupDetailsEntity.prototype, "totalArea", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'infrastructure_details',
        type: 'jsonb',
        default: () => "'{}'",
    }),
    __metadata("design:type", Object)
], SocietySetupDetailsEntity.prototype, "infrastructureDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => society_block_entity_1.SocietyBlockEntity, (block) => block.society),
    __metadata("design:type", Array)
], SocietySetupDetailsEntity.prototype, "blocks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address_line1', type: 'text' }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "addressLine1", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'area_locality', length: 150 }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "areaLocality", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city', length: 100 }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'district_code', length: 50 }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "districtCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_code', length: 50 }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "stateCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pincode', length: 10 }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "pincode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'landmark', length: 150, nullable: true }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "landmark", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'admin_name', length: 150, nullable: true }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "adminName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'admin_mobile', length: 15, nullable: true }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "adminMobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'admin_email', length: 150, nullable: true }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "adminEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'package_id', type: 'uuid' }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'smallint',
        default: 1,
    }),
    __metadata("design:type", Number)
], SocietySetupDetailsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'onboarding_date',
        type: 'timestamptz',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], SocietySetupDetailsEntity.prototype, "onboardingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid' }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], SocietySetupDetailsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SocietySetupDetailsEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'updated_at',
        type: 'timestamptz',
        nullable: true,
    }),
    __metadata("design:type", Date)
], SocietySetupDetailsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_deleted',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], SocietySetupDetailsEntity.prototype, "isDeleted", void 0);
exports.SocietySetupDetailsEntity = SocietySetupDetailsEntity = __decorate([
    (0, typeorm_1.Entity)({
        schema: 'society_management',
        name: 'society_setup_details',
    })
], SocietySetupDetailsEntity);
//# sourceMappingURL=society-details.entity.js.map