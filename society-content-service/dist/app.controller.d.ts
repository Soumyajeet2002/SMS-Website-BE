import { AppService } from './app.service';
import { CommuteService } from './commute-service/commute.service';
import type { Request } from 'express';
export declare class AppController {
    private readonly appService;
    private commute;
    constructor(appService: AppService, commute: CommuteService);
    getHello(): string;
    getUsers(req: Request): any;
}
