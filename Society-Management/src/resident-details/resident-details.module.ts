import { Module } from '@nestjs/common';
import { ResidentDetailsController } from './resident-details.controller';
import { ResidentDetailsService } from './resident-details.service';
import { ResidentDetails } from './entities/resident-details.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSocietyMapModule } from '../user-society-map/user-society-map.module';
@Module({
    imports: [
      TypeOrmModule.forFeature([ResidentDetails]),
      UserSocietyMapModule
    ],
  controllers: [ResidentDetailsController],
  providers: [ResidentDetailsService]
})
export class ResidentDetailsModule {}
