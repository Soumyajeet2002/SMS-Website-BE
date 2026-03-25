import { DemoSlotMasterEntity } from '../../demo_slot_master/entities/demo-slot.entities';
export declare enum SlotScheduleStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    DELETED = 2
}
export declare class DemoSlotScheduleEntity {
    scheduleId: string;
    slotDate: string;
    slot: DemoSlotMasterEntity;
    demoBy: string;
    status: SlotScheduleStatus;
    metadata?: Record<string, any>;
    createdBy?: string;
    createdAt: Date;
    updatedBy?: string;
    updatedAt?: Date;
}
