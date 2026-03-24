import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuestUsersController } from './guest-users.controller';
import { GuestUsersService } from './guest-users.service';
import { GuestUserEntity } from './entities/guest-users.entities';
import { DemoSlotBookingEntity } from '../demo_bookings/entities/demo_booking.entities';

@Module({
  imports: [TypeOrmModule.forFeature([GuestUserEntity, DemoSlotBookingEntity])],
  controllers: [GuestUsersController],
  providers: [GuestUsersService],
  exports: [GuestUsersService],
})
export class GuestUsersModule {}
