declare class VehicleDto {
    vehicleType: string;
    numberPlate: string;
    vehicleModel?: string;
    vehiclePhoto?: string;
    fuelType?: number;
    metaData?: Record<string, any>;
}
export declare class CreateVehicleDto {
    residentId: string;
    vehicles: VehicleDto[];
}
export {};
