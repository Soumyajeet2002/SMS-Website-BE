import { Repository } from 'typeorm';
import { ParkingSlotEntity } from './entities/parking-slot-management.entities';
import { VehicleRegistrationEntity } from '../vehicle_registration/entities/vehicle_registration.entities';
import { CreateParkingSlotDto } from './dto/enter-parking-slot.dto';
import { GetParkingSlotsDto } from './dto/query-parking-slot.dto';
export declare class ParkingSLotManagementService {
    private readonly parkingRepo;
    private readonly vehicleRepo;
    private readonly logger;
    constructor(parkingRepo: Repository<ParkingSlotEntity>, vehicleRepo: Repository<VehicleRegistrationEntity>);
    executeByActionType(fn: string, ...args: any[]): Promise<unknown>;
    _createParkingSlot(dto: CreateParkingSlotDto, userId: string): Promise<{
        message: string;
        data: ParkingSlotEntity;
    }>;
    _getAllParkingSlots(dto: GetParkingSlotsDto): Promise<{
        message: string;
        total: number;
        page: number;
        limit: number;
        data: {
            blockId: string;
            slots: any[];
        }[];
    }>;
}
