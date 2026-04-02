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
exports.CreateVehicleDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class VehicleDto {
    vehicleType;
    numberPlate;
    vehicleModel;
    vehiclePhoto;
    fuelType;
    metaData;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of vehicle (e.g., Car, Bike, Scooter)',
        example: 'Car',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleDto.prototype, "vehicleType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vehicle registration number (number plate)',
        example: 'OD02AB1234',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleDto.prototype, "numberPlate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Model or variant of the vehicle',
        example: 'Hyundai i20 Sportz',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleDto.prototype, "vehicleModel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL of the vehicle image/photo',
        example: 'https://example.com/vehicle.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleDto.prototype, "vehiclePhoto", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fuel type of vehicle (0 = ICE, 1 = EV)',
        example: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], VehicleDto.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional metadata related to the vehicle',
        example: {
            color: 'white',
            parkingSlot: 'B12',
            stickerIssued: true,
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], VehicleDto.prototype, "metaData", void 0);
class CreateVehicleDto {
    residentId;
    vehicles;
}
exports.CreateVehicleDto = CreateVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the resident',
        example: 'c1b2c3d4-1234-5678-9101-abcdef123456',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "residentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [VehicleDto],
        description: 'List of vehicles',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => VehicleDto),
    __metadata("design:type", Array)
], CreateVehicleDto.prototype, "vehicles", void 0);
//# sourceMappingURL=create-vehicle-registration.dto.js.map