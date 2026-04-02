import { VehicleStatus, FuelType } from '../entities/vehicle_registration.entities';
export declare class GetVehicleQueryDto {
    residentId?: string;
    search?: string;
    vehicleType?: string;
    fuelType?: FuelType;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    status?: VehicleStatus;
}
