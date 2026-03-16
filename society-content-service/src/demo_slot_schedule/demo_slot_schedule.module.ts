import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DemoSlotScheduleController } from './demo_slot_schedule.controller';
import { DemoSlotScheduleService } from './demo_slot_schedule.service';

import { DemoSlotScheduleEntity } from './entities/slot-schedule.entities';
import { DemoSlotMasterEntity } from '../demo_slot_master/entities/demo-slot.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([DemoSlotScheduleEntity, DemoSlotMasterEntity]),
  ],
  controllers: [DemoSlotScheduleController],
  providers: [DemoSlotScheduleService],
  exports: [DemoSlotScheduleService],
})
export class DemoSlotScheduleModule {}
