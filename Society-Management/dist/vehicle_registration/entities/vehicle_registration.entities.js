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
exports.VehicleRegistrationEntity = exports.VehicleStatus = exports.FuelType = void 0;
const typeorm_1 = require("typeorm");
var FuelType;
(function (FuelType) {
    FuelType[FuelType["ICE"] = 0] = "ICE";
    FuelType[FuelType["EV"] = 1] = "EV";
})(FuelType || (exports.FuelType = FuelType = {}));
var VehicleStatus;
(function (VehicleStatus) {
    VehicleStatus[VehicleStatus["INACTIVE"] = 0] = "INACTIVE";
    VehicleStatus[VehicleStatus["ACTIVE"] = 1] = "ACTIVE";
    VehicleStatus[VehicleStatus["DELETED"] = 2] = "DELETED";
})(VehicleStatus || (exports.VehicleStatus = VehicleStatus = {}));
let VehicleRegistrationEntity = class VehicleRegistrationEntity {
    vehicleId;
    residentId;
    vehicleType;
    numberPlate;
    vehicleModel;
    vehiclePhoto;
    fuelType;
    status;
    metaData;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
};
exports.VehicleRegistrationEntity = VehicleRegistrationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'vehicle_id' }),
    __metadata("design:type", String)
], VehicleRegistrationEntity.prototype, "vehicleId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'resident_id', type: 'uuid' }),
    __metadata("design:type", String)
], VehicleRegistrationEntity.prototype, "residentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vehicle_type', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], VehicleRegistrationEntity.prototype, "vehicleType", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ name: 'number_plate', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], VehicleRegistrationEntity.prototype, "numberPlate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'vehicle_model',
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], VehicleRegistrationEntity.prototype, "vehicleModel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vehicle_photo', type: 'text', nullable: true }),
    __metadata("design:type", String)
], VehicleRegistrationEntity.prototype, "vehiclePhoto", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'fuel_type',
        type: 'smallint',
        enum: FuelType,
        nullable: true,
    }),
    __metadata("design:type", Number)
], VehicleRegistrationEntity.prototype, "fuelType", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'smallint',
        enum: VehicleStatus,
        default: VehicleStatus.ACTIVE,
    }),
    __metadata("design:type", Number)
], VehicleRegistrationEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'meta_data',
        type: 'jsonb',
        nullable: true,
    }),
    __metadata("design:type", Object)
], VehicleRegistrationEntity.prototype, "metaData", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
    }),
    __metadata("design:type", Date)
], VehicleRegistrationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], VehicleRegistrationEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        nullable: true,
    }),
    __metadata("design:type", Date)
], VehicleRegistrationEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], VehicleRegistrationEntity.prototype, "updatedBy", void 0);
exports.VehicleRegistrationEntity = VehicleRegistrationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'vehicle_registration', schema: 'society_management' })
], VehicleRegistrationEntity);
//# sourceMappingURL=vehicle_registration.entities.js.map