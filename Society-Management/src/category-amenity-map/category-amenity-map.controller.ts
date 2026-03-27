import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateCategoryAmenityMapDto } from './dto/create-category-amenity-map.dto';
import { CategoryAmenityMapService } from './category-amenity-map.service';
import { UpdateCategoryAmenityMapDto } from './dto/update-category-amenity-map.dto';

@Controller('category-amenity-map')
export class CategoryAmenityMapController {

    constructor(private categoryamenityService: CategoryAmenityMapService) { }

    @ApiBearerAuth('access-token')
    @Post()
    async createCategoryAmenityMap(@Body() data: CreateCategoryAmenityMapDto, @Req() req: any) {
        return this.categoryamenityService.executeByAction('create', data, req);
    }

    @ApiBearerAuth('access-token')
    @ApiQuery({
        name: 'CategoryCode',
        required: false,
        example: 'SECURITY'
    })
    @Get()
    async getCategoryAmenityMap(@Query('CategoryCode') categoryCode?: string) {
        return this.categoryamenityService.executeByAction('find', categoryCode);
    }

    @ApiBearerAuth('access-token')
    @Patch()
    async updateCategoryAmenityMap(@Body() data: UpdateCategoryAmenityMapDto, @Req() req: any) {
        return this.categoryamenityService.executeByAction('update', data, req);
    }
}
