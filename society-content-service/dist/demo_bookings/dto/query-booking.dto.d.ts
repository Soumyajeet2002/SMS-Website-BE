import { SlotScheduleStatus } from '../../demo_slot_schedule/entities/slot-schedule.entities';
export declare class GetScheduleQueryDto {
    demoBy?: string;
    search?: string;
    date?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    status?: SlotScheduleStatus;
}
