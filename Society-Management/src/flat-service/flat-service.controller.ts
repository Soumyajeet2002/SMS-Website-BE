import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FlatServiceService } from './flat-service.service';
import { CreateSocietyFlatListingDto } from './dto/create-society-flat-listing.dto';
import { UpdateSocietyFlatListingDto } from './dto/update-society-flat-listing.dto';
import { QueryFlatDto } from './dto/query-flat.dto';

@Controller('flat-service')
export class FlatServiceController {

    constructor(private flatService: FlatServiceService) { }

    @ApiBearerAuth('access-token')
    @Post()
    async createFlat(@Req() req: Request, @Body() data: CreateSocietyFlatListingDto) {
        return this.flatService.executeByDBType('create', data, req);
    }

    @ApiBearerAuth('access-token')
    @Post('list')
    async getFlatList(@Query() query: QueryFlatDto) {
        return this.flatService.executeByDBType('getAll',query)
    }

    /** Update by id */
    @ApiBearerAuth('access-token')
    @Patch()
    async updateFlat(@Body() data: UpdateSocietyFlatListingDto, @Req() req: any) {
        return this.flatService.executeByDBType('update', data, req)
    }
}
