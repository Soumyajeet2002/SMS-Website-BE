import { Body, Controller, Post, Req, Patch, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DemoSlotBookingService } from './demo_booking.service';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { GetDemoRequestDetailsDto } from './dto/create-booking.dto';

// @ApiTags('Demo Slot Booking')
@Controller('demo-slot-booking')
export class DemoSlotBookingController {
  constructor(private readonly bookingService: DemoSlotBookingService) {}

  @ApiBearerAuth('access-token')
  @Post('get-demo-request-details')
  getAll(@Body() body: GetDemoRequestDetailsDto, @Req() req: any) {
    return this.bookingService.executeByActionType('create', req, body.demoBy);
  }

  @ApiOperation({ summary: 'Update demo slot booking(s)' })
  @ApiBearerAuth('access-token')
  @Patch('confirm-booking')
  update(@Body() dto: UpdateBookingDto, @Req() req: any) {
    return this.bookingService.executeByActionType('update', dto, req);
  }
}
