import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
export declare class CommuteService {
    private readonly http;
    constructor(http: HttpService);
    getUserProfile(req: Request, userId?: string): Promise<any>;
}
