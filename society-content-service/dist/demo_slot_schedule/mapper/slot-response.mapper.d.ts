import { DemoSlotScheduleEntity } from '../entities/slot-schedule.entities';
export declare const demoSlotScheduleResMapperSql: (schedule: DemoSlotScheduleEntity) => {
    scheduleId: string;
    slotDate: string;
    demoBy: string;
    slot: import("../../demo_slot_master/entities/demo-slot.entities").DemoSlotMasterEntity;
    metadata: Record<string, any> | undefined;
    createdBy: string | undefined;
    createdAt: Date;
    updatedBy: string | undefined;
    updatedAt: Date | undefined;
};
