import { Repository } from 'typeorm';
import { DemoSlotScheduleEntity, SlotScheduleStatus } from './entities/slot-schedule.entities';
import { DemoSlotMasterEntity } from '../demo_slot_master/entities/demo-slot.entities';
import { CreateSlotScheduleDto } from './dto/create-slot.dto';
import { GetScheduleQueryDto } from './dto/query-slot.dto';
import { CreateSlotScheduleResponseDto } from './dto/create-slot-schedule-response.dto';
import { UpdateSlotScheduleDto } from './dto/update-slot.dto';
import { DemoSlotBookingEntity } from '../demo_bookings/entities/demo_booking.entities';
import { DeleteScheduleDto } from './dto/delete.dto';
export declare class DemoSlotScheduleService {
    private readonly sqlRepo;
    private readonly slotRepo;
    private readonly bookingRepo;
    private readonly logger;
    constructor(sqlRepo: Repository<DemoSlotScheduleEntity>, slotRepo: Repository<DemoSlotMasterEntity>, bookingRepo: Repository<DemoSlotBookingEntity>);
    executeByActionType(fn: string, ...args: any[]): Promise<unknown>;
    _createSchedule(dto: CreateSlotScheduleDto, req?: any): Promise<{
        message: string;
        data: CreateSlotScheduleResponseDto;
    }>;
    _findAllSchedules(query: GetScheduleQueryDto): Promise<{
        message: string;
        page: number;
        limit: number | null;
        total: number;
        totalPages: number;
        data: any[];
    }>;
    _findOneSchedule(demoBy: string): Promise<{
        message: string;
        data: any[];
    }>;
    _updateSchedule(dto: UpdateSlotScheduleDto): Promise<{
        message: string;
        data: DemoSlotScheduleEntity[];
    }>;
    _removeSchedule(dto: DeleteScheduleDto): Promise<{
        message: string;
    }>;
    getBookedSlots(demoBy: string, date: string): Promise<{
        message: string;
        data: {
            slotId: string;
            slotName: string;
            startTime: string;
            endTime: string;
            status: SlotScheduleStatus;
        }[];
    }>;
}
