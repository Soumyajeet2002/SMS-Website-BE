import { GuestUsersService } from './guest-users.service';
import { CreateGuestUserDto } from './dto/create-guest-user.dto';
import { UpdateGuestUserDto } from './dto/update-guest-user.dto';
import { QueryGuestUserDto } from './dto/query-guest-user.dto';
export declare class GuestUsersController {
    private guestUsersService;
    constructor(guestUsersService: GuestUsersService);
    createSecure(data: CreateGuestUserDto, req: any): Promise<unknown>;
    createPublic(data: CreateGuestUserDto, req: any): Promise<unknown>;
    findAll(query: QueryGuestUserDto): Promise<unknown>;
    findOne(id: string): Promise<unknown>;
    update(id: string, updateGuestUserDto: UpdateGuestUserDto): Promise<unknown>;
    remove(id: string): Promise<unknown>;
}
