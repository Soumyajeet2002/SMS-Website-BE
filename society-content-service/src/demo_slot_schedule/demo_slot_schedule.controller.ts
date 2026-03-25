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

import { DemoSlotScheduleService } from './demo_slot_schedule.service';

import { CreateSlotScheduleDto } from './dto/create-slot.dto';
import { GetScheduleQueryDto } from './dto/query-slot.dto';
import { UpdateSlotScheduleDto } from './dto/update-slot.dto';
import { DeleteScheduleDto } from './dto/delete.dto';

@ApiTags('Demo Slot Schedule')
@Controller('demo-slot-schedule')
export class DemoSlotScheduleController {
  constructor(private demoSlotScheduleService: DemoSlotScheduleService) {}

  /** Create Slot Schedule */
  @ApiOperation({ summary: 'Create a slot schedule' })
  // @Public()
  @ApiBearerAuth('access-token')
  @Post()
  create(@Body() dto: CreateSlotScheduleDto, @Req() req: any) {
    return this.demoSlotScheduleService.executeByActionType('create', dto, req);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get booked slots by demoBy and date' })
  @Get('slots-status')
  getBookedSlots(@Query('demoBy') demoBy: string, @Query('date') date: string) {
    return this.demoSlotScheduleService.getBookedSlots(demoBy, date);
  }

  /** Get All Slot Schedules */
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all slot schedules with pagination' })
  @Get()
  findAll(@Query() dto: GetScheduleQueryDto) {
    return this.demoSlotScheduleService.executeByActionType('findAll', dto);
  }

  /** Get Slot Schedule by ID */
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get Slot Details with DemoID' })
  @Get(':id')
  findOne(@Param('demoBy_id') id: string) {
    return this.demoSlotScheduleService.executeByActionType('findOne', id);
  }

  /** Update Slot Schedule */
  // @Public()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update slot schedule by ID' })
  @Patch()
  update(@Body() dto: UpdateSlotScheduleDto) {
    return this.demoSlotScheduleService.executeByActionType('update', dto);
  }

  /** Delete Slot Schedule (Soft Delete) */
  // @Public()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete' })
  @Delete()
  remove(@Body() dto: DeleteScheduleDto) {
    return this.demoSlotScheduleService.executeByActionType('remove', dto);
  }
}
