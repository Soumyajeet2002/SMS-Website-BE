import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { PackageTierMapService } from './package-tier-map.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreatePackageTierMapDto } from './dto/create-package-tier-map.dto';
import { UpdatePackageTierMapDto } from './dto/update-package-tier-map.dto';

@Controller('package-tier-map')
export class PackageTierMapController {

    constructor(private packageTierService: PackageTierMapService) { }

    @ApiBearerAuth('access-token')
    @Post()
    async createCategoryAmenityMap(@Body() data: CreatePackageTierMapDto, @Req() req: any) {
        return this.packageTierService.executeByAction('create', data, req);
    }

    @ApiQuery({
        name: 'TierCode',
        required: false,
        example: 'CORE'
    })
    @ApiBearerAuth('access-token')
    @Get()
    async getCategoryAmenityMap(@Query('TierCode') TierCode?: string) {
        return this.packageTierService.executeByAction('find', TierCode);
    }

    @ApiBearerAuth('access-token')
    @Patch()
    async updateCategoryAmenityMap(@Body() data: UpdatePackageTierMapDto, @Req() req: any) {
        return this.packageTierService.executeByAction('update', data, req);
    }

}
