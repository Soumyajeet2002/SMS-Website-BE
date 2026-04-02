import { DataSource } from 'typeorm';
import { Repository } from 'typeorm';
import { VehicleRegistrationEntity } from './entities/vehicle_registration.entities';
import { GetVehicleQueryDto } from './dto/query-vehicle-registration.dto';
import { UpdateVehicleBulkDto } from './dto/update-vehicle.dto';
export declare class VehicleService {
    private readonly vehicleRepo;
    private readonly dataSource;
    private readonly logger;
    constructor(vehicleRepo: Repository<VehicleRegistrationEntity>, dataSource: DataSource);
    executeByActionType(fn: string, ...args: any[]): Promise<unknown>;
    _createVehicle(data: any, userId?: string): Promise<{
        status: number;
        message: string;
        data: {
            residentId: any;
            vehicles: VehicleRegistrationEntity[];
        };
    }>;
    _getVehiclesByResident(query: GetVehicleQueryDto): Promise<{
        message: string;
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        data: unknown[];
    }>;
    _updateVehiclesByResident(residentId: string, dto: UpdateVehicleBulkDto, userId?: string): Promise<{
        status: number;
        message: string;
        data: {
            residentId: string;
            vehicles: VehicleRegistrationEntity[];
        };
    }>;
    deleteVehicle(vehicleId: string): Promise<{
        message: string;
    }>;
}
