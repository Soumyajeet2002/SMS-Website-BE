import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSlotEntity } from './entities/parking-slot-management.entities';
import { ParkingSLotManagementService } from './parking-slot-management.service';
import { ParkingSlotController } from './parking-slot-management.controller';
import { VehicleRegistrationEntity } from '../vehicle_registration/entities/vehicle_registration.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingSlotEntity, VehicleRegistrationEntity]),
  ],
  controllers: [ParkingSlotController],
  providers: [ParkingSLotManagementService],
  exports: [ParkingSLotManagementService],
})
export class ParkingSlotModule {}
