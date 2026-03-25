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
exports.CreateDemoSlotDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const demo_slot_entities_1 = require("../entities/demo-slot.entities");
const specific_msg_1 = require("../../common/messages/specific.msg");
class CreateDemoSlotDto {
    slotName;
    startTime;
    endTime;
    status;
}
exports.CreateDemoSlotDto = CreateDemoSlotDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the demo slot',
        example: 'Morning Slot',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDemoSlotDto.prototype, "slotName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start time of the demo slot (HH:MM:SS)',
        example: '09:00:00',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDemoSlotDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End time of the demo slot (HH:MM:SS)',
        example: '10:00:00',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDemoSlotDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status of the demo slot (0=Inactive, 1=Active, 2=Deleted)',
        example: demo_slot_entities_1.SlotStatus.ACTIVE,
        default: demo_slot_entities_1.SlotStatus.ACTIVE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: specific_msg_1.DEMO_SLOT_MASTER.ERRORS.SLOT_INTEGER }),
    (0, class_validator_1.IsIn)([0, 1, 2], { message: specific_msg_1.DEMO_SLOT_MASTER.ERRORS.SLOT_INVALID }),
    __metadata("design:type", Number)
], CreateDemoSlotDto.prototype, "status", void 0);
//# sourceMappingURL=create-demo-slot.dto.js.map