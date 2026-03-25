import { Repository } from 'typeorm';
import { GuestUserEntity } from './entities/guest-users.entities';
import { CreateGuestUserDto } from './dto/create-guest-user.dto';
import { UpdateGuestUserDto } from './dto/update-guest-user.dto';
import { QueryGuestUserDto } from './dto/query-guest-user.dto';
import { DemoSlotBookingEntity } from '../demo_bookings/entities/demo_booking.entities';
export declare class GuestUsersService {
    private readonly sqlRepo;
    private readonly bookingRepo;
    private readonly logger;
    constructor(sqlRepo: Repository<GuestUserEntity>, bookingRepo: Repository<DemoSlotBookingEntity>);
    executeByActionType(fn: string, ...args: any[]): Promise<unknown>;
    _createGuestUserSql(dto: CreateGuestUserDto): Promise<{
        message: string;
        data: {
            guest_Id: string;
            full_Name: string;
            mobile_No: string;
            email: string | undefined;
            city: string | undefined;
            projectDescription: string | undefined;
            source: string | undefined;
            status: import("./entities/guest-users.entities").GuestUserStatus;
            bookingStatus: number | undefined;
            metadata: Record<string, unknown>;
        };
    }>;
    _findAllSql(query: QueryGuestUserDto): Promise<{
        message: string;
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: {
            guest_Id: string;
            full_Name: string;
            mobile_No: string;
            email: string | undefined;
            city: string | undefined;
            projectDescription: string | undefined;
            source: string | undefined;
            status: import("./entities/guest-users.entities").GuestUserStatus;
            bookingStatus: number;
            metadata: Record<string, unknown>;
        }[];
    }>;
    _findOneSql(id: string): Promise<{
        message: string;
        data: {
            guest_Id: string;
            full_Name: string;
            mobile_No: string;
            email: string | undefined;
            city: string | undefined;
            projectDescription: string | undefined;
            source: string | undefined;
            status: import("./entities/guest-users.entities").GuestUserStatus;
            bookingStatus: number | undefined;
            metadata: Record<string, unknown>;
        };
    }>;
    _updateSql(id: string, dto: UpdateGuestUserDto): Promise<{
        message: string;
        data: {
            guest_Id: string;
            full_Name: string;
            mobile_No: string;
            email: string | undefined;
            city: string | undefined;
            projectDescription: string | undefined;
            source: string | undefined;
            status: import("./entities/guest-users.entities").GuestUserStatus;
            bookingStatus: number | undefined;
            metadata: Record<string, unknown>;
        };
    }>;
    _removeSql(id: string): Promise<{
        message: string;
    }>;
}
