import { Repository } from 'typeorm';
import { DemoSlotBookingEntity, BookingStatus } from './entities/demo_booking.entities';
import { DemoSlotScheduleEntity } from '../demo_slot_schedule/entities/slot-schedule.entities';
import { GuestUserEntity } from '../guest_users/entities/guest-users.entities';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class DemoSlotBookingService {
    private readonly bookingRepo;
    private readonly scheduleRepo;
    private readonly guestRepo;
    private readonly sqlRepo;
    private readonly logger;
    constructor(bookingRepo: Repository<DemoSlotBookingEntity>, scheduleRepo: Repository<DemoSlotScheduleEntity>, guestRepo: Repository<GuestUserEntity>, sqlRepo: Repository<DemoSlotScheduleEntity>);
    executeByActionType(fn: string, ...args: any[]): Promise<unknown>;
    _GetSlotDetails(req?: any, demoBy?: string): Promise<{
        message: string;
        data: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            data: {
                schedule_id: any;
                demoBy: any;
                demoByname: any;
                slot_date: any;
                slot_id: any;
                slot_name: any;
                demoBy_id: any;
                start_time: any;
                end_time: any;
                schedule_status: any;
                is_booked: number;
            }[];
        };
    }>;
    _updateBooking(dto: UpdateBookingDto, req?: any): Promise<{
        message: string;
        data: DemoSlotBookingEntity;
    } | {
        message: string;
        data: {
            bookingId: string;
            guestId: string;
            scheduleId: string;
            bookingStatus: BookingStatus;
            is_booked: number;
        };
    }>;
    _removeBooking(id: string): Promise<{
        message: string;
        bookingId: string;
    }>;
}
