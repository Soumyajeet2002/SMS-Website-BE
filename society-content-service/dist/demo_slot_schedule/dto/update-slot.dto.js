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
exports.UpdateSlotScheduleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const slot_schedule_entities_1 = require("../entities/slot-schedule.entities");
class SlotUpdateDto {
    scheduleId;
    slotId;
    slotName;
    status;
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Schedule ID (required for update)',
        example: '834321d6-59ae-4c05-95e4-e0cd85957842',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SlotUpdateDto.prototype, "scheduleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Slot ID',
        example: 'c195152b-8b85-4286-aedb-6746b3451d7e',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SlotUpdateDto.prototype, "slotId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Slot Name',
        example: 'Evening Slot -1',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlotUpdateDto.prototype, "slotName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status of the slot',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsIn)([0, 1, 2]),
    __metadata("design:type", Number)
], SlotUpdateDto.prototype, "status", void 0);
class UpdateSlotScheduleDto {
    demoBy;
    slotDate;
    slots;
    status;
}
exports.UpdateSlotScheduleDto = UpdateSlotScheduleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Demo by user ID',
        example: '18877320-c822-4123-bda4-cbe97543f1db',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateSlotScheduleDto.prototype, "demoBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Slot Date (optional)',
        example: '2026-04-29',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSlotScheduleDto.prototype, "slotDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Slots to update (add/remove/update)',
        type: [SlotUpdateDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SlotUpdateDto),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], UpdateSlotScheduleDto.prototype, "slots", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status of slot schedule',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsIn)([0, 1, 2]),
    __metadata("design:type", Number)
], UpdateSlotScheduleDto.prototype, "status", void 0);
//# sourceMappingURL=update-slot.dto.js.map