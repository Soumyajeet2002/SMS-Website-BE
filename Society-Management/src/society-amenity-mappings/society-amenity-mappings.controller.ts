import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common';
import { SocietyAmenityMappingsService } from './society-amenity-mappings.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateSocietyAmenityMapDto } from './dto/create-society-amenity-map.dto';
import { UpdateSocietyAmenityMapDto } from './dto/update-society-amenity-map.dto';
import { SocietyIdDto } from './dto/get-by-societyId.dto';

@Controller('society-amenity-mappings')
export class SocietyAmenityMappingsController {
    constructor(private societyAmenityMapService: SocietyAmenityMappingsService) { }

    @ApiBearerAuth('access-token')
    @Post()
    async createCSocietyAmenityMap(@Body() data: CreateSocietyAmenityMapDto, @Req() req: any) {
        return this.societyAmenityMapService.executeByAction('create', data, req);
    }

    // @ApiBearerAuth('access-token')
    // @Get()
    // async getSocietyAmenityMap(@Req() req: any) {
    //     return this.societyAmenityMapService.executeByAction('find',req);
    // }

    @ApiBearerAuth('access-token')
    @Post('/by-societyid')
    async getBySocietyId(@Body() body: SocietyIdDto) {
        return this.societyAmenityMapService.executeByAction('findById', body.societyId);
    }

    // @ApiBearerAuth('access-token')
    // @Patch()
    // async updateSocietyAmenityMap(@Body() data: UpdateSocietyAmenityMapDto, @Req() req: any) {
    //     return this.societyAmenityMapService.executeByAction('update', data, req);
    // }
}
