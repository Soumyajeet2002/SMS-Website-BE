import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserSocietyMapService } from './user-society-map.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserSocietyMapDto } from './dto/create-user-society-map.dto';
import { UpdateUserSocietyMapDto } from './dto/update-user-society-map.dto';
import { GetUserSocietyDto } from './dto/get-user-society.dto';

@Controller('user-society-map')
export class UserSocietyMapController {

    constructor(private userSocietyService: UserSocietyMapService) { }

    @ApiBearerAuth('access-token')
    @Post()
    async createService(@Body() data: CreateUserSocietyMapDto, @Req() req: any) {
        return this.userSocietyService.executeByActionType('create', data, req)
    }

    @ApiBearerAuth('access-token')
    @Post('get-user')
    async getUser(@Body() body: GetUserSocietyDto) {
        return this.userSocietyService.executeByActionType('find', body)
    }

    @ApiBearerAuth('access-token')
    @Get()
    async getAllUserSocietyMap() {
        return this.userSocietyService.executeByActionType('findAll');
    }

    /** Update a user by ID */
    @ApiBearerAuth('access-token')
    @Put(':id')
    async updateUserDetails(@Param('id') id: string, @Body() data: UpdateUserSocietyMapDto, @Req() req: any) {
        return this.userSocietyService.executeByActionType('update', id, data, req)
    }

    @ApiBearerAuth('access-token')
    // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userSocietyService.executeByActionType('remove', id)
    }
}
