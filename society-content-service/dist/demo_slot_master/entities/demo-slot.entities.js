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
exports.DemoSlotMasterEntity = exports.SlotStatus = void 0;
const typeorm_1 = require("typeorm");
var SlotStatus;
(function (SlotStatus) {
    SlotStatus[SlotStatus["INACTIVE"] = 0] = "INACTIVE";
    SlotStatus[SlotStatus["ACTIVE"] = 1] = "ACTIVE";
    SlotStatus[SlotStatus["DELETED"] = 2] = "DELETED";
})(SlotStatus || (exports.SlotStatus = SlotStatus = {}));
let DemoSlotMasterEntity = class DemoSlotMasterEntity {
    slotId;
    slotName;
    startTime;
    endTime;
    durationMinutes;
    calculateDuration() {
        const start = new Date(`1970-01-01T${this.startTime}`);
        const end = new Date(`1970-01-01T${this.endTime}`);
        if (end < start) {
            end.setDate(end.getDate() + 1);
        }
        this.durationMinutes = (end.getTime() - start.getTime()) / 60000;
    }
    status;
    metadata;
    createdBy;
    createdAt;
    updatedBy;
    updatedAt;
};
exports.DemoSlotMasterEntity = DemoSlotMasterEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'slot_id' }),
    __metadata("design:type", String)
], DemoSlotMasterEntity.prototype, "slotId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slot_name', type: 'time' }),
    __metadata("design:type", String)
], DemoSlotMasterEntity.prototype, "slotName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time', type: 'time' }),
    __metadata("design:type", String)
], DemoSlotMasterEntity.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time', type: 'time' }),
    __metadata("design:type", String)
], DemoSlotMasterEntity.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_minutes', type: 'int' }),
    __metadata("design:type", Number)
], DemoSlotMasterEntity.prototype, "durationMinutes", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DemoSlotMasterEntity.prototype, "calculateDuration", null);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        default: SlotStatus.ACTIVE,
        comment: '0=Inactive, 1=Active, 2=Deleted',
    }),
    __metadata("design:type", Number)
], DemoSlotMasterEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DemoSlotMasterEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], DemoSlotMasterEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], DemoSlotMasterEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], DemoSlotMasterEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], DemoSlotMasterEntity.prototype, "updatedAt", void 0);
exports.DemoSlotMasterEntity = DemoSlotMasterEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'demo_slot_master', schema: 'society_cms' }),
    (0, typeorm_1.Index)('idx_demo_slot_status', ['status'])
], DemoSlotMasterEntity);
//# sourceMappingURL=demo-slot.entities.js.map