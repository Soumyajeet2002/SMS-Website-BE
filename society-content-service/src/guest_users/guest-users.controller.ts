import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

import { GuestUsersService } from './guest-users.service';
import { CreateGuestUserDto } from './dto/create-guest-user.dto';
import { UpdateGuestUserDto } from './dto/update-guest-user.dto';
import { QueryGuestUserDto } from './dto/query-guest-user.dto';

import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Guest Users')
@Controller('guest-users')
export class GuestUsersController {
  constructor(private guestUsersService: GuestUsersService) {}

  /** Create Guest User */
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new guest user Token Based' })
  // @Post()
  @Post('secure')
  // create(@Body() data: CreateGuestUserDto, @Req() req: any) {
  createSecure(@Body() data: CreateGuestUserDto, @Req() req: any) {
    return this.guestUsersService.executeByActionType('create', data, req);
  }
  // Public create endpoint
  @ApiOperation({ summary: 'Create a new guest user Public' })
  @Public()
  @Post('public')
  // create(@Body() data: CreateGuestUserDto, @Req() req: any) {
  createPublic(@Body() data: CreateGuestUserDto, @Req() req: any) {
    return this.guestUsersService.executeByActionType('create', data, req);
  }

  /** Get All Guest Users */
  // @Public()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all guest users with pagination and search' })
  @Get()
  findAll(@Query() query: QueryGuestUserDto) {
    return this.guestUsersService.executeByActionType('findAll', query);
  }

  /** Get Guest User by ID */
  // @Public()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get guest user by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestUsersService.executeByActionType('findOne', id);
  }

  /** Update Guest User */
  // @ApiBearerAuth('access-token')
  @Public()
  @ApiOperation({ summary: 'Update guest user by ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuestUserDto: UpdateGuestUserDto,
  ) {
    return this.guestUsersService.executeByActionType(
      'update',
      id,
      updateGuestUserDto,
    );
  }

  /** Soft Delete Guest User */
  // @ApiBearerAuth('access-token')
  @Public()
  @ApiOperation({ summary: 'Delete guest user by ID ' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestUsersService.executeByActionType('remove', id);
  }
}
