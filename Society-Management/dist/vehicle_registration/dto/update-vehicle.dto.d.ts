import { FuelType, VehicleStatus } from '../entities/vehicle_registration.entities';
export declare class UpdateVehicleDto {
    vehicleId: string;
    numberPlate?: string;
    vehicleType?: string;
    vehicleModel?: string;
    vehiclePhoto?: string;
    fuelType?: FuelType;
    status?: VehicleStatus;
    metaData?: Record<string, any>;
}
export declare class UpdateVehicleBulkDto {
    vehicles: UpdateVehicleDto[];
}
