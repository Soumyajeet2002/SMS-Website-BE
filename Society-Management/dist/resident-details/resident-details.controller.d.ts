import { ResidentDetailsService } from './resident-details.service';
import { UserSocietyMapService } from '../user-society-map/user-society-map.service';
import { CreateResidentMapDto } from './dto/create-resident-details.dto';
export declare class ResidentDetailsController {
    private residentDetailsService;
    private userSocietyService;
    constructor(residentDetailsService: ResidentDetailsService, userSocietyService: UserSocietyMapService);
    createService(data: CreateResidentMapDto, req: any): Promise<any>;
}
