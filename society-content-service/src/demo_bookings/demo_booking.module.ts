import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DemoSlotBookingEntity } from './entities/demo_booking.entities';
import { DemoSlotScheduleEntity } from '../demo_slot_schedule/entities/slot-schedule.entities';
import { GuestUserEntity } from '../guest_users/entities/guest-users.entities';

import { DemoSlotBookingService } from './demo_booking.service';
import { DemoSlotBookingController } from './demo_booking.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DemoSlotBookingEntity,
      DemoSlotScheduleEntity,
      GuestUserEntity,
    ]),
  ],
  controllers: [DemoSlotBookingController],
  providers: [DemoSlotBookingService],
  exports: [DemoSlotBookingService],
})
export class DemoSlotBookingModule {}
