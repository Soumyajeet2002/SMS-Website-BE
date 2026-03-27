import { UserSocietyMapService } from './user-society-map.service';
import { CreateUserSocietyMapDto } from './dto/create-user-society-map.dto';
import { UpdateUserSocietyMapDto } from './dto/update-user-society-map.dto';
import { GetUserSocietyDto } from './dto/get-user-society.dto';
export declare class UserSocietyMapController {
    private userSocietyService;
    constructor(userSocietyService: UserSocietyMapService);
    createService(data: CreateUserSocietyMapDto, req: any): Promise<any>;
    getUser(body: GetUserSocietyDto): Promise<any>;
    getAllUserSocietyMap(): Promise<any>;
    updateUserDetails(id: string, data: UpdateUserSocietyMapDto, req: any): Promise<any>;
    deleteUser(id: string): Promise<any>;
}
