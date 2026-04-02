"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleMapper = void 0;
const vehicle_registration_entities_1 = require("../entities/vehicle_registration.entities");
class VehicleMapper {
    static toEntity(data, userId) {
        const vehicle = new vehicle_registration_entities_1.VehicleRegistrationEntity();
        vehicle.residentId = data.residentId;
        vehicle.vehicleType = data.vehicleType;
        vehicle.numberPlate = data.numberPlate?.toUpperCase();
        vehicle.vehicleModel = data.vehicleModel ?? null;
        vehicle.vehiclePhoto = data.vehiclePhoto ?? null;
        vehicle.fuelType = data.fuelType ?? null;
        vehicle.metaData = data.metaData ?? null;
        vehicle.status = vehicle_registration_entities_1.VehicleStatus.ACTIVE;
        vehicle.createdBy = userId;
        return vehicle;
    }
}
exports.VehicleMapper = VehicleMapper;
//# sourceMappingURL=vehicle-registration.mapper.js.map