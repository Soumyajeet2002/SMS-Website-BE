// vehicle.mapper.ts

import {
  VehicleRegistrationEntity,
  VehicleStatus,
} from '../entities/vehicle_registration.entities';

export class VehicleMapper {
  static toEntity(data: any, userId?: string): VehicleRegistrationEntity {
    const vehicle = new VehicleRegistrationEntity();

    vehicle.residentId = data.residentId;
    vehicle.vehicleType = data.vehicleType;
    vehicle.numberPlate = data.numberPlate?.toUpperCase();

    vehicle.vehicleModel = data.vehicleModel ?? null;
    vehicle.vehiclePhoto = data.vehiclePhoto ?? null;
    vehicle.fuelType = data.fuelType ?? null;
    vehicle.metaData = data.metaData ?? null;

    vehicle.status = VehicleStatus.ACTIVE;
    vehicle.createdBy = userId;

    return vehicle;
  }
}
