import { DemoSlotMasterEntity } from '../entities/demo-slot.entities';
export declare const demoSlotResMapperSql: (data: DemoSlotMasterEntity) => {
    slot_Id: string;
    slot_Name: string;
    start_Time: string;
    end_Time: string;
    duration_Minutes: number;
    status: import("../entities/demo-slot.entities").SlotStatus;
    metadata: Record<string, any> | undefined;
    createdAt: Date;
    updatedAt: Date | undefined;
};
