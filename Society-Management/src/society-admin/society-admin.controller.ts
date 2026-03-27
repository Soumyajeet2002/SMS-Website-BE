import { Controller, Get, Req } from '@nestjs/common';
import { SocietyAdminService } from './society-admin.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('society-admin')
export class SocietyAdminController {

    constructor(private societyAdminService:SocietyAdminService ) { }

    @ApiBearerAuth('access-token')
    @Get()
    async getData(@Req() req:any) {
        return this.societyAdminService.executeByActionType('findAll',req);
    }
}
