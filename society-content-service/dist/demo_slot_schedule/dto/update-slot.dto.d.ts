import { SlotScheduleStatus } from '../entities/slot-schedule.entities';
declare class SlotUpdateDto {
    scheduleId: string;
    slotId: string;
    slotName?: string;
    status?: SlotScheduleStatus;
}
export declare class UpdateSlotScheduleDto {
    demoBy?: string;
    slotDate?: string;
    slots?: SlotUpdateDto[];
    status?: SlotScheduleStatus;
}
export {};
