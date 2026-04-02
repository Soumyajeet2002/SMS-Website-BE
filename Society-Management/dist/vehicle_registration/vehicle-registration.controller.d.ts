import { GetVehicleQueryDto } from './dto/query-vehicle-registration.dto';
import { VehicleService } from './vehicle-registration.service';
import { CreateVehicleDto } from './dto/create-vehicle-registration.dto';
import { UpdateVehicleBulkDto } from './dto/update-vehicle.dto';
export declare class VehicleController {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    createVehicle(body: CreateVehicleDto, req: any): Promise<unknown>;
    findAll(dto: GetVehicleQueryDto): Promise<unknown>;
    updateVehiclesByResident(residentId: string, body: UpdateVehicleBulkDto): Promise<{
        status: number;
        message: string;
        data: {
            residentId: string;
            vehicles: import("./entities/vehicle_registration.entities").VehicleRegistrationEntity[];
        };
    }>;
}
