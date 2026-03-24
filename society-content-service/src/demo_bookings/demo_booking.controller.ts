import { Body, Controller, Post, Req, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

import { DemoSlotBookingService } from './demo_booking.service';
import { CreateSlotBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@ApiTags('Demo Slot Booking')
@Controller('demo-slot-booking')
export class DemoSlotBookingController {
  constructor(private readonly bookingService: DemoSlotBookingService) {}

  // /** Create Booking */
  // @ApiOperation({ summary: 'Create demo slot booking' })
  // @ApiBearerAuth('access-token')
  // @Post()
  // create(@Body() dto: CreateSlotBookingDto, @Req() req: any) {
  //   return this.bookingService.executeByActionType('create', dto, req);
  // }

  /** Update Booking(s) */
  @ApiOperation({ summary: 'Update demo slot booking(s)' })
  @ApiBearerAuth('access-token')
  @Patch()
  update(@Body() dto: UpdateBookingDto, @Req() req: any) {
    return this.bookingService._updateBooking(dto, req);
  }
}
