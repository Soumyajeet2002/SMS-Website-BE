import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DemoSlotScheduleController } from './demo_slot_schedule.controller';
import { DemoSlotScheduleService } from './demo_slot_schedule.service';

import { DemoSlotScheduleEntity } from './entities/slot-schedule.entities';
import { DemoSlotMasterEntity } from '../demo_slot_master/entities/demo-slot.entities';
import { DemoSlotBookingEntity } from '../demo_bookings/entities/demo_booking.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DemoSlotScheduleEntity,
      DemoSlotMasterEntity,
      DemoSlotBookingEntity,
    ]),
  ],
  controllers: [DemoSlotScheduleController],
  providers: [DemoSlotScheduleService],
  exports: [DemoSlotScheduleService],
})
export class DemoSlotScheduleModule {}
