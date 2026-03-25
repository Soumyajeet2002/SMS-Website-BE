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
exports.DemoSlotScheduleEntity = exports.SlotScheduleStatus = void 0;
const typeorm_1 = require("typeorm");
const demo_slot_entities_1 = require("../../demo_slot_master/entities/demo-slot.entities");
var SlotScheduleStatus;
(function (SlotScheduleStatus) {
    SlotScheduleStatus[SlotScheduleStatus["INACTIVE"] = 0] = "INACTIVE";
    SlotScheduleStatus[SlotScheduleStatus["ACTIVE"] = 1] = "ACTIVE";
    SlotScheduleStatus[SlotScheduleStatus["DELETED"] = 2] = "DELETED";
})(SlotScheduleStatus || (exports.SlotScheduleStatus = SlotScheduleStatus = {}));
let DemoSlotScheduleEntity = class DemoSlotScheduleEntity {
    scheduleId;
    slotDate;
    slot;
    demoBy;
    status;
    metadata;
    createdBy;
    createdAt;
    updatedBy;
    updatedAt;
};
exports.DemoSlotScheduleEntity = DemoSlotScheduleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'schedule_id' }),
    __metadata("design:type", String)
], DemoSlotScheduleEntity.prototype, "scheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'slot_date', type: 'date' }),
    __metadata("design:type", String)
], DemoSlotScheduleEntity.prototype, "slotDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => demo_slot_entities_1.DemoSlotMasterEntity, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'slot_id' }),
    __metadata("design:type", demo_slot_entities_1.DemoSlotMasterEntity)
], DemoSlotScheduleEntity.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'demo_by', type: 'uuid' }),
    __metadata("design:type", String)
], DemoSlotScheduleEntity.prototype, "demoBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        default: SlotScheduleStatus.ACTIVE,
        comment: '0=Inactive, 1=Active, 2=Deleted',
    }),
    __metadata("design:type", Number)
], DemoSlotScheduleEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DemoSlotScheduleEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], DemoSlotScheduleEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], DemoSlotScheduleEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], DemoSlotScheduleEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], DemoSlotScheduleEntity.prototype, "updatedAt", void 0);
exports.DemoSlotScheduleEntity = DemoSlotScheduleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'demo_slot_schedule', schema: 'society_cms' }),
    (0, typeorm_1.Index)('idx_demo_slot_schedule_date', ['slotDate']),
    (0, typeorm_1.Index)('idx_demo_slot_schedule_status', ['status'])
], DemoSlotScheduleEntity);
//# sourceMappingURL=slot-schedule.entities.js.map