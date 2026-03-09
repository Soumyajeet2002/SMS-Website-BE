import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuestUsersController } from './guest-users.controller';
import { GuestUsersService } from './guest-users.service';
import { GuestUserEntity } from './entities/guest-users.entities';

@Module({
  imports: [TypeOrmModule.forFeature([GuestUserEntity])],
  controllers: [GuestUsersController],
  providers: [GuestUsersService],
  exports: [GuestUsersService],
})
export class GuestUsersModule {}
