import { SecurityGuardsService } from './security-guards.service';
import { CreateSecurityGuardsDto } from './dto/create-security-guards.dto';
import { GetSecurityGuardsDto } from './dto/query-security-guards.dto';
export declare class SecurityGuardsController {
    private securityGuardsService;
    constructor(securityGuardsService: SecurityGuardsService);
    createGuards(req: Request, dto: CreateSecurityGuardsDto): Promise<any>;
    findAll(query: GetSecurityGuardsDto): Promise<any>;
}
