import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DemoSlotMasterController } from './demo_slot_master.controller';
import { DemoSlotMasterService } from './demo_slot_master.service';
import { DemoSlotMasterEntity } from './entities/demo-slot.entities';

@Module({
  imports: [TypeOrmModule.forFeature([DemoSlotMasterEntity])],
  controllers: [DemoSlotMasterController],
  providers: [DemoSlotMasterService],
  exports: [DemoSlotMasterService],
})
export class DemoSlotMasterModule {}
