import { SocietyDetailsService } from './society-details.service';
import { CreateSocietySetupDetailsDto } from './dto/create-society-details.dto';
import { UpdateSocietyDetailsDto } from './dto/update-society-details.dto';
import { QuerySocietyDto } from './dto/query-society-details.dto';
import type { Request } from 'express';
export declare class SocietyDetailsController {
    private readonly societyDetailsService;
    constructor(societyDetailsService: SocietyDetailsService);
    create(dto: CreateSocietySetupDetailsDto, req: Request): Promise<any>;
    getById(id: string): Promise<any>;
    getAll(req: Request, query: QuerySocietyDto): Promise<any>;
    update(id: string, dto: UpdateSocietyDetailsDto, req: Request): Promise<any>;
}
