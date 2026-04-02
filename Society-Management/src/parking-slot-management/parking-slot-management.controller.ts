import { Body, Controller, Post, Req, Get, Query } from '@nestjs/common';
import { ParkingSLotManagementService } from './parking-slot-management.service';
import { CreateParkingSlotDto } from './dto/enter-parking-slot.dto';
import { GetParkingSlotsDto } from './dto/query-parking-slot.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('parking-slots')
// @ApiTags('Parking-slot-Management')
@ApiBearerAuth('access-token')
export class ParkingSlotController {
  constructor(private readonly parkingService: ParkingSLotManagementService) {}

  @Post('enter-vehicle-into-parking-slot')
  create(@Body() dto: CreateParkingSlotDto, @Req() req: any) {
    return this.parkingService.executeByActionType(
      'create',
      dto,
      req.user.userId,
    );
  }
  @Get('get-all-parking-slots')
  getAll(@Query() dto: GetParkingSlotsDto) {
    return this.parkingService.executeByActionType('getall', dto);
  }
}
