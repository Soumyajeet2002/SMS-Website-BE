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
exports.ParkingSlotEntity = exports.ParkingSlotStatus = void 0;
const typeorm_1 = require("typeorm");
var ParkingSlotStatus;
(function (ParkingSlotStatus) {
    ParkingSlotStatus[ParkingSlotStatus["AVAILABLE"] = 0] = "AVAILABLE";
    ParkingSlotStatus[ParkingSlotStatus["OCCUPIED"] = 1] = "OCCUPIED";
    ParkingSlotStatus[ParkingSlotStatus["BLOCKED"] = 2] = "BLOCKED";
})(ParkingSlotStatus || (exports.ParkingSlotStatus = ParkingSlotStatus = {}));
let ParkingSlotEntity = class ParkingSlotEntity {
    slotId;
    residentUuid;
    blockId;
    rowNo;
    columnNo;
    status;
    metaData;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
};
exports.ParkingSlotEntity = ParkingSlotEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'slot_id' }),
    __metadata("design:type", String)
], ParkingSlotEntity.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'resident_uuid', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], ParkingSlotEntity.prototype, "residentUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'block_id', type: 'uuid' }),
    __metadata("design:type", String)
], ParkingSlotEntity.prototype, "blockId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'row_no', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], ParkingSlotEntity.prototype, "rowNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'column_no', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], ParkingSlotEntity.prototype, "columnNo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'smallint',
        enum: ParkingSlotStatus,
        default: ParkingSlotStatus.AVAILABLE,
    }),
    __metadata("design:type", Number)
], ParkingSlotEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meta_data', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ParkingSlotEntity.prototype, "metaData", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
    }),
    __metadata("design:type", Date)
], ParkingSlotEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid' }),
    __metadata("design:type", String)
], ParkingSlotEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        nullable: true,
    }),
    __metadata("design:type", Date)
], ParkingSlotEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], ParkingSlotEntity.prototype, "updatedBy", void 0);
exports.ParkingSlotEntity = ParkingSlotEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'parking_slot_mapping', schema: 'society_management' })
], ParkingSlotEntity);
//# sourceMappingURL=parking-slot-management.entities.js.map