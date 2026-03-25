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
exports.CreateSlotScheduleDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const slot_schedule_entities_1 = require("../entities/slot-schedule.entities");
class SlotItemDto {
    slotId;
    slotName;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Slot ID from Demo Slot Master',
        example: 'ed33804f-e6c7-4a50-8f3c-b5489bc340ed',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SlotItemDto.prototype, "slotId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Slot name (optional)',
        example: 'Night Shift',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlotItemDto.prototype, "slotName", void 0);
class CreateSlotScheduleDto {
    demoBy;
    slotDate;
    slots;
    status;
}
exports.CreateSlotScheduleDto = CreateSlotScheduleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Demo By (User ID)',
        example: 'ed33804f-e6c7-4a50-8f3c-b5489bc340ed',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSlotScheduleDto.prototype, "demoBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date for which the slot is scheduled',
        example: '2026-03-20',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSlotScheduleDto.prototype, "slotDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of slots to schedule',
        type: [SlotItemDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SlotItemDto),
    __metadata("design:type", Array)
], CreateSlotScheduleDto.prototype, "slots", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status of slot schedule (0=Inactive, 1=Active, 2=Deleted)',
        example: slot_schedule_entities_1.SlotScheduleStatus.ACTIVE,
        default: slot_schedule_entities_1.SlotScheduleStatus.ACTIVE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsIn)([0, 1, 2]),
    __metadata("design:type", Number)
], CreateSlotScheduleDto.prototype, "status", void 0);
//# sourceMappingURL=create-slot.dto.js.map