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

import { DemoSlotMasterService } from './demo_slot_master.service';
import { CreateDemoSlotDto } from './dto/create-demo-slot.dto';
import { UpdateDemoSlotDto } from './dto/update-demo-slot.dto';
import { QueryDemoSlotDto } from './dto/query-demo-slot.dto';

import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Demo Slot Master')
@Controller('demo-slot-master')
export class DemoSlotMasterController {
  constructor(private demoSlotMasterService: DemoSlotMasterService) {}

  /** Create Demo Slot (Public) */
  @ApiOperation({ summary: 'Create a new demo slot (Public)' })
  @Public()
  @Post('demo-slot')
  createPublic(@Body() data: CreateDemoSlotDto, @Req() req: any) {
    return this.demoSlotMasterService.executeByActionType('create', data, req);
  }

  /** Get All Demo Slots */
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all demo slots with pagination and search' })
  @Get()
  findAll(@Query() query: QueryDemoSlotDto) {
    return this.demoSlotMasterService.executeByActionType('findAll', query);
  }

  /** Get Demo Slot by ID */
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get demo slot by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demoSlotMasterService.executeByActionType('findOne', id);
  }

  /** Update Demo Slot */
  @Public()
  @ApiOperation({ summary: 'Update demo slot by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDemoSlotDto) {
    return this.demoSlotMasterService.executeByActionType(
      'update',
      id,
      updateDto,
    );
  }

  /** Soft Delete Demo Slot */
  @Public()
  @ApiOperation({ summary: 'Delete demo slot by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoSlotMasterService.executeByActionType('remove', id);
  }
}
