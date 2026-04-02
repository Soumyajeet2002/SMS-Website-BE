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
exports.SecurityGuardsEntity = void 0;
const typeorm_1 = require("typeorm");
let SecurityGuardsEntity = class SecurityGuardsEntity {
    id;
    guardId;
    vendorId;
    dateOfBirth;
    gender;
    emergencyContact;
    permanentAddress;
    currentAddress;
    profilePhotoUrl;
    idType;
    idNumber;
    idProofUrl;
    policeVerificationStatus;
    backgroundCheckStatus;
    employeeCode;
    joiningDate;
    employmentType;
    designation;
    status;
    metadata;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
};
exports.SecurityGuardsEntity = SecurityGuardsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guard_id', type: 'uuid' }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "guardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_of_birth', type: 'date' }),
    __metadata("design:type", Date)
], SecurityGuardsEntity.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gender', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emergency_contact', type: 'varchar', length: 10, unique: true, nullable: true }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "emergencyContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'permanent_address', type: 'text' }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "permanentAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_address', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "currentAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_photo_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "profilePhotoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_type', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "idType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_number', type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "idNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_proof_url', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "idProofUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'police_verification_status', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], SecurityGuardsEntity.prototype, "policeVerificationStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'background_check_status', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], SecurityGuardsEntity.prototype, "backgroundCheckStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_code', type: 'varchar', length: 50, unique: true, nullable: true }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "employeeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'joining_date', type: 'date' }),
    __metadata("design:type", Date)
], SecurityGuardsEntity.prototype, "joiningDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employment_type', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "employmentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'designation', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'smallint', default: 1 }),
    __metadata("design:type", Number)
], SecurityGuardsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata', type: 'jsonb', default: () => `'{}'` }),
    __metadata("design:type", Object)
], SecurityGuardsEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', type: 'timestamptz', default: () => 'now()' }),
    __metadata("design:type", Date)
], SecurityGuardsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid' }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SecurityGuardsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SecurityGuardsEntity.prototype, "updatedBy", void 0);
exports.SecurityGuardsEntity = SecurityGuardsEntity = __decorate([
    (0, typeorm_1.Entity)({ schema: 'society_management', name: 'security_guards' })
], SecurityGuardsEntity);
//# sourceMappingURL=security-guards.entities.js.map