export declare enum SlotStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    DELETED = 2
}
export declare class DemoSlotMasterEntity {
    slotId: string;
    slotName: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    calculateDuration(): void;
    status: SlotStatus;
    metadata?: Record<string, any>;
    createdBy?: string;
    createdAt: Date;
    updatedBy?: string;
    updatedAt?: Date;
}
