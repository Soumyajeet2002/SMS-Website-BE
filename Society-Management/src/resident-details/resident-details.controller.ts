import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResidentDetailsService } from './resident-details.service';
import { UserSocietyMapService } from '../user-society-map/user-society-map.service';
import { CreateResidentMapDto } from './dto/create-resident-details.dto';
@Controller('resident-details')
export class ResidentDetailsController {
    constructor(
        private residentDetailsService: ResidentDetailsService,
        private userSocietyService: UserSocietyMapService,
    ) { }
    @ApiBearerAuth('access-token')
    @Post('create-resident')
    async createService(@Body() data: CreateResidentMapDto, @Req() req: any) {
        let payload = {
            userId: data.residentId,
            societyId: data.societyId,
            userRole: data.ownerType,
            isActive: true,
            createdBy: data.residentId
        }

        const res1 = await this.userSocietyService.executeByActionType('create', payload, req);
        if (!res1.success) {
            throw new Error('User-Society mapping failed');
        }

        return await this.residentDetailsService.executeByActionType('create', data, req);
    }
}
