import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('media')
export class MediaController {

    // constructor(private mediaService: MediaService) { }

    // @ApiBearerAuth('access-token')
    // @Post()
    // async createMedia(@Req() req: Request, @Body() data: CreateMediaDto) {
    //     return this.mediaService.executeByDBType('create', data, req);
    // }

    // @ApiBearerAuth('access-token')
    // @Get()
    // async getMedia() {
    //     return this.mediaService.executeByDBType('getAll')
    // }

    // /** Update by id */
    // @ApiBearerAuth('access-token')
    // @Patch()
    // async updateMedia(@Body() data: UpdateMediaDto, @Req() req: any) {
    //     return this.mediaService.executeByDBType('update', data, req)
    // }
}
