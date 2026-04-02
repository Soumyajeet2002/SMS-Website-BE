export declare enum FuelType {
    ICE = 0,
    EV = 1
}
export declare enum VehicleStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    DELETED = 2
}
export declare class VehicleRegistrationEntity {
    vehicleId: string;
    residentId: string;
    vehicleType: string;
    numberPlate: string;
    vehicleModel?: string;
    vehiclePhoto?: string;
    fuelType?: FuelType;
    status: VehicleStatus;
    metaData?: Record<string, any>;
    createdAt: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
}
