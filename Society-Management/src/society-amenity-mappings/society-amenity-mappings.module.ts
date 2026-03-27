import { Module } from '@nestjs/common';
import { SocietyAmenityMappingsController } from './society-amenity-mappings.controller';
import { SocietyAmenityMappingsService } from './society-amenity-mappings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocietyAmenityMappingsEntity } from './entities/society-amenity-map.entities';
import { AmenityEntity } from '@sms/db-entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SocietyAmenityMappingsEntity,
      AmenityEntity
    ])],
  controllers: [SocietyAmenityMappingsController],
  providers: [SocietyAmenityMappingsService]
})
export class SocietyAmenityMappingsModule { }
