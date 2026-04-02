import { ParkingSlotStatus } from '../entities/parking-slot-management.entities';
export declare class SlotDto {
    residentUuid: string;
    rowNo: string;
    columnNo: string;
    status?: ParkingSlotStatus;
    metaData?: Record<string, any>;
}
export declare class CreateParkingSlotDto {
    blockId: string;
    slot: SlotDto;
}
