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
exports.CreateSlotScheduleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SlotItemResponseDto {
    slotId;
    slotName;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ed33804f-e6c7-4a50-8f3c-b5489bc340ed',
    }),
    __metadata("design:type", String)
], SlotItemResponseDto.prototype, "slotId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Night Shift',
    }),
    __metadata("design:type", String)
], SlotItemResponseDto.prototype, "slotName", void 0);
class CreateSlotScheduleResponseDto {
    demoBy;
    slotDate;
    status;
    slots;
}
exports.CreateSlotScheduleResponseDto = CreateSlotScheduleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ac33804f-e6c7-4a50-8f3c-b5489bc340ed',
    }),
    __metadata("design:type", String)
], CreateSlotScheduleResponseDto.prototype, "demoBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-01-20',
    }),
    __metadata("design:type", String)
], CreateSlotScheduleResponseDto.prototype, "slotDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
    }),
    __metadata("design:type", Number)
], CreateSlotScheduleResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [SlotItemResponseDto],
    }),
    __metadata("design:type", Array)
], CreateSlotScheduleResponseDto.prototype, "slots", void 0);
//# sourceMappingURL=create-slot-schedule-response.dto.js.map