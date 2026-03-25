declare class SlotItemResponseDto {
    slotId: string;
    slotName: string;
}
export declare class CreateSlotScheduleResponseDto {
    demoBy: string;
    slotDate: string;
    status: number;
    slots: SlotItemResponseDto[];
}
export {};
