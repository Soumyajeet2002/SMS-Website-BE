export declare enum ParkingSlotStatus {
    AVAILABLE = 0,
    OCCUPIED = 1,
    BLOCKED = 2
}
export declare class ParkingSlotEntity {
    slotId: string;
    residentUuid: string | null;
    blockId: string;
    rowNo: string;
    columnNo: string;
    status: ParkingSlotStatus;
    metaData: Record<string, any>;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}
