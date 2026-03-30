// vehicle.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleRegistrationEntity } from './entities/vehicle_registration.entities';

import { VehicleService } from './vehicle-registration.service';
import { VehicleController } from './vehicle-registration.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleRegistrationEntity])],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService],
})
export class VehicleModule {}
