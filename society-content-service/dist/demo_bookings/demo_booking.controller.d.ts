import { DemoSlotBookingService } from './demo_booking.service';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { GetDemoRequestDetailsDto } from './dto/create-booking.dto';
export declare class DemoSlotBookingController {
    private readonly bookingService;
    constructor(bookingService: DemoSlotBookingService);
    getAll(body: GetDemoRequestDetailsDto, req: any): Promise<unknown>;
    update(dto: UpdateBookingDto, req: any): Promise<unknown>;
}
