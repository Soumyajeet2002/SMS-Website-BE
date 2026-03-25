import { DemoSlotScheduleService } from './demo_slot_schedule.service';
import { CreateSlotScheduleDto } from './dto/create-slot.dto';
import { GetScheduleQueryDto } from './dto/query-slot.dto';
import { UpdateSlotScheduleDto } from './dto/update-slot.dto';
import { DeleteScheduleDto } from './dto/delete.dto';
export declare class DemoSlotScheduleController {
    private demoSlotScheduleService;
    constructor(demoSlotScheduleService: DemoSlotScheduleService);
    create(dto: CreateSlotScheduleDto, req: any): Promise<unknown>;
    getBookedSlots(demoBy: string, date: string): Promise<{
        message: string;
        data: {
            slotId: string;
            slotName: string;
            startTime: string;
            endTime: string;
            status: import("./entities/slot-schedule.entities").SlotScheduleStatus;
        }[];
    }>;
    findAll(dto: GetScheduleQueryDto): Promise<unknown>;
    findOne(id: string): Promise<unknown>;
    update(dto: UpdateSlotScheduleDto): Promise<unknown>;
    remove(dto: DeleteScheduleDto): Promise<unknown>;
}
