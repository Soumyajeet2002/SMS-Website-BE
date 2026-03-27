import { Module } from '@nestjs/common';
import { UserSocietyMapController } from './user-society-map.controller';
import { UserSocietyMapService } from './user-society-map.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSocietyMapEntity } from './entities/user-society-map.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSocietyMapEntity])
  ],
  controllers: [UserSocietyMapController],
  providers: [UserSocietyMapService],
   exports: [UserSocietyMapService],
})
export class UserSocietyMapModule { }
