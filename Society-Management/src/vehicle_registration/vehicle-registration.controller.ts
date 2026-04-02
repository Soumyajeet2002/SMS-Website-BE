// vehicle.controller.ts

import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { GetVehicleQueryDto } from './dto/query-vehicle-registration.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { VehicleService } from './vehicle-registration.service';
import { CreateVehicleDto } from './dto/create-vehicle-registration.dto';
// import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { UpdateVehicleBulkDto } from './dto/update-vehicle.dto';

@ApiTags('Vehicle Registration')
@ApiBearerAuth('access-token')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('create-vehicle')
  @ApiOperation({ summary: 'Create a new vehicle' })
  async createVehicle(@Body() body: CreateVehicleDto, @Req() req: any) {
    const userId = req.user?.id;

    return this.vehicleService.executeByActionType('create', body, userId);
  }

  @ApiOperation({ summary: 'Get all vehicles with pagination and filters' })
  @Get('get-all-data')
  findAll(@Query() dto: GetVehicleQueryDto) {
    return this.vehicleService.executeByActionType('getByResident', dto);
  }

  @ApiOperation({ summary: 'Patch vehicle details by residentId' })
  @Patch(':residentId')
  async updateVehiclesByResident(
    @Param('residentId') residentId: string,
    @Body() body: UpdateVehicleBulkDto,
  ) {
    return this.vehicleService._updateVehiclesByResident(residentId, body);
  }

  //   @Delete(':vehicleId')
  //   @ApiOperation({ summary: 'Soft delete vehicle' })
  //   deleteVehicle(@Param('vehicleId') vehicleId: string) {
  //     return this.vehicleService.deleteVehicle(vehicleId);
  //   }
}
