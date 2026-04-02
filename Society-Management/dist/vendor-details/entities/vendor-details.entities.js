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
exports.VendorDetailsEntity = exports.VendorStatus = void 0;
const typeorm_1 = require("typeorm");
var VendorStatus;
(function (VendorStatus) {
    VendorStatus[VendorStatus["INACTIVE"] = 0] = "INACTIVE";
    VendorStatus[VendorStatus["ACTIVE"] = 1] = "ACTIVE";
    VendorStatus[VendorStatus["BLACKLISTED"] = 2] = "BLACKLISTED";
    VendorStatus[VendorStatus["DELETED"] = 3] = "DELETED";
})(VendorStatus || (exports.VendorStatus = VendorStatus = {}));
let VendorDetailsEntity = class VendorDetailsEntity {
    vendorId;
    societyId;
    vendorName;
    vendorType;
    email;
    phoneNo;
    vendorStatus;
    address;
    metadata;
    created_at;
    created_by;
    updated_at;
    updated_by;
};
exports.VendorDetailsEntity = VendorDetailsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'vendor_id' }),
    __metadata("design:type", String)
], VendorDetailsEntity.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'society_id', type: 'uuid' }),
    __metadata("design:type", String)
], VendorDetailsEntity.prototype, "societyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_name', type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], VendorDetailsEntity.prototype, "vendorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_type', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], VendorDetailsEntity.prototype, "vendorType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], VendorDetailsEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone_no', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], VendorDetailsEntity.prototype, "phoneNo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'vendor_status',
        type: 'smallint',
        default: VendorStatus.ACTIVE,
    }),
    __metadata("design:type", Number)
], VendorDetailsEntity.prototype, "vendorStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'text', nullable: true }),
    __metadata("design:type", String)
], VendorDetailsEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], VendorDetailsEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], VendorDetailsEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], VendorDetailsEntity.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], VendorDetailsEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], VendorDetailsEntity.prototype, "updated_by", void 0);
exports.VendorDetailsEntity = VendorDetailsEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'vendor_details',
        schema: 'society_management',
    })
], VendorDetailsEntity);
//# sourceMappingURL=vendor-details.entities.js.map