import { SocietyAdminService } from './society-admin.service';
export declare class SocietyAdminController {
    private societyAdminService;
    constructor(societyAdminService: SocietyAdminService);
    getData(req: any): Promise<any>;
}
