import { ParkingSLotManagementService } from './parking-slot-management.service';
import { CreateParkingSlotDto } from './dto/enter-parking-slot.dto';
import { GetParkingSlotsDto } from './dto/query-parking-slot.dto';
export declare class ParkingSlotController {
    private readonly parkingService;
    constructor(parkingService: ParkingSLotManagementService);
    create(dto: CreateParkingSlotDto, req: any): Promise<unknown>;
    getAll(dto: GetParkingSlotsDto): Promise<unknown>;
}
