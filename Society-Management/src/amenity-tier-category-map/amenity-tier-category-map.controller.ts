import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { TierCategoryMapService } from './amenity-tier-category-map.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateAmenityTierCategoryMapDto } from './dto/create-amenity-tier-category-map.dto';
import { UpdateAmenityTierCategoryMap } from './dto/update-amenity-tier-category-map.dto';

@Controller('tier-category-map')
export class TierCategoryMapController {

    constructor(private amenityTierCategoryMapService: TierCategoryMapService) { }

    @ApiBearerAuth('access-token')
    @Post()
    async createAmenityCatgMap(@Body() data: CreateAmenityTierCategoryMapDto, @Req() req: any) {
        return this.amenityTierCategoryMapService.executeByActionType('create', data, req)
    }

    @ApiBearerAuth('access-token')
    @ApiQuery({
        name: 'tierCode',
        required: false,
        example: 'CORE'
    })
    @Get()
    async getCategoryAmenityMap(@Query('tierCode') tierCode?: string) {
        return this.amenityTierCategoryMapService.executeByActionType('findAll', tierCode);
    }


    @ApiBearerAuth('access-token')
    @Get(':id')
    async getAmenityCatgMap(@Param('id') id: string) {
        return this.amenityTierCategoryMapService.executeByActionType('findOne', id)
    }

    /** Update by Tier Code */
    @ApiBearerAuth('access-token')
    @Patch()
    async updateAmenityCatgMap( @Body() data: UpdateAmenityTierCategoryMap, @Req() req: any) {
        return this.amenityTierCategoryMapService.executeByActionType('update', data, req)
    }

    // @ApiBearerAuth('access-token')
    // // @UseGuards(JwtAuthGuard)
    // @Delete(':id')
    // async deleteAmenityCatgMap(@Param('id') id: string) {
    //     return this.amenityTierCategoryMapService.executeByActionType('remove', id)
    // }

}
