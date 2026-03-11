import { Module } from '@nestjs/common';
import { DemoSlotScheduleController } from './demo_slot_schedule.controller';
import { DemoSlotScheduleService } from './demo_slot_schedule.service';

@Module({
  controllers: [DemoSlotScheduleController],
  providers: [DemoSlotScheduleService]
})
export class DemoSlotScheduleModule {}
