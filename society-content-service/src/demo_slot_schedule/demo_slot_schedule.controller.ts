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

import { Public } from 'src/common/decorators/public.decorator';
import { CreateSlotScheduleDto } from './dto/create-slot.dto';
import { GetScheduleQueryDto } from './dto/query-slot.dto';
import { UpdateSlotScheduleDto } from './dto/update-slot.dto';

@ApiTags('Demo Slot Schedule')
@Controller('demo-slot-schedule')
export class DemoSlotScheduleController {
  constructor(private demoSlotScheduleService: DemoSlotScheduleService) {}

  /** Create Slot Schedule */
  @ApiOperation({ summary: 'Create a slot schedule' })
  @Public()
  @Post()
  create(@Body() dto: CreateSlotScheduleDto, @Req() req: any) {
    return this.demoSlotScheduleService.executeByActionType('create', dto, req);
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
  @Public()
  @ApiOperation({ summary: 'Update slot schedule by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSlotScheduleDto) {
    return this.demoSlotScheduleService.executeByActionType('update', id, dto);
  }

  /** Delete Slot Schedule (Soft Delete) */
  @Public()
  @ApiOperation({ summary: 'Delete slot schedule by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoSlotScheduleService.executeByActionType('remove', id);
  }
}
