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
exports.UpdateVehicleBulkDto = exports.UpdateVehicleDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const vehicle_registration_entities_1 = require("../entities/vehicle_registration.entities");
class UpdateVehicleDto {
    vehicleId;
    numberPlate;
    vehicleType;
    vehicleModel;
    vehiclePhoto;
    fuelType;
    status;
    metaData;
}
exports.UpdateVehicleDto = UpdateVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique ID of the vehicle',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "vehicleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Vehicle number plate',
        example: 'OD02AB1234',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "numberPlate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Type of vehicle',
        example: 'Car',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "vehicleType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Vehicle model',
        example: 'Hyundai i20',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "vehicleModel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Vehicle photo URL',
        example: 'https://example.com/vehicle.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "vehiclePhoto", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Fuel type',
        enum: vehicle_registration_entities_1.FuelType,
        example: vehicle_registration_entities_1.FuelType.ICE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(vehicle_registration_entities_1.FuelType),
    __metadata("design:type", Number)
], UpdateVehicleDto.prototype, "fuelType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Vehicle status',
        enum: vehicle_registration_entities_1.VehicleStatus,
        example: vehicle_registration_entities_1.VehicleStatus.ACTIVE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(vehicle_registration_entities_1.VehicleStatus),
    __metadata("design:type", Number)
], UpdateVehicleDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional metadata',
        example: { color: 'red', year: 2022 },
        type: Object,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateVehicleDto.prototype, "metaData", void 0);
class UpdateVehicleBulkDto {
    vehicles;
}
exports.UpdateVehicleBulkDto = UpdateVehicleBulkDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of vehicles to update',
        type: [UpdateVehicleDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateVehicleDto),
    __metadata("design:type", Array)
], UpdateVehicleBulkDto.prototype, "vehicles", void 0);
//# sourceMappingURL=update-vehicle.dto.js.map