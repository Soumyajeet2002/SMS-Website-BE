import { SlotStatus } from '../entities/demo-slot.entities';
export declare class CreateDemoSlotDto {
    slotName: string;
    startTime: string;
    endTime: string;
    status?: SlotStatus;
}
