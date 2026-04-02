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
exports.CreateParkingSlotDto = exports.SlotDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const parking_slot_management_entities_1 = require("../entities/parking-slot-management.entities");
const class_transformer_1 = require("class-transformer");
class SlotDto {
    residentUuid;
    rowNo;
    columnNo;
    status;
    metaData;
}
exports.SlotDto = SlotDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle ID',
        example: 'b3f8c7a2-9c1e-4d2a-8b7e-123456789abc',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SlotDto.prototype, "residentUuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Row number',
        example: 'A1',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlotDto.prototype, "rowNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Column number',
        example: '10',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SlotDto.prototype, "columnNo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status of slot',
        enum: parking_slot_management_entities_1.ParkingSlotStatus,
        example: parking_slot_management_entities_1.ParkingSlotStatus.AVAILABLE,
    }),
    (0, class_validator_1.IsEnum)(parking_slot_management_entities_1.ParkingSlotStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SlotDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional metadata',
        example: {
            color: 'red',
            Type: 'SUV',
        },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], SlotDto.prototype, "metaData", void 0);
class CreateParkingSlotDto {
    blockId;
    slot;
}
exports.CreateParkingSlotDto = CreateParkingSlotDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Block ID',
        example: 'b3f8c7a2-9c1e-4d2a-8b7e-123456789abc',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateParkingSlotDto.prototype, "blockId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Slot details',
        type: SlotDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => SlotDto),
    __metadata("design:type", SlotDto)
], CreateParkingSlotDto.prototype, "slot", void 0);
//# sourceMappingURL=enter-parking-slot.dto.js.map