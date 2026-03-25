import { SlotScheduleStatus } from '../entities/slot-schedule.entities';
declare class SlotItemDto {
    slotId: string;
    slotName?: string;
}
export declare class CreateSlotScheduleDto {
    demoBy: string;
    slotDate: string;
    slots: SlotItemDto[];
    status?: SlotScheduleStatus;
}
export {};
