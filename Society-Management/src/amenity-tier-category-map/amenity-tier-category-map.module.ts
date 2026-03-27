import { Module } from '@nestjs/common';
import { TierCategoryMapController } from './amenity-tier-category-map.controller';
import { TierCategoryMapService } from './amenity-tier-category-map.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TierCategoryMapEntity } from './entities/amenity-tier-category-map.entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([TierCategoryMapEntity])
  ],
  controllers: [TierCategoryMapController],
  providers: [TierCategoryMapService]
})
export class AmenityTierCategoryMapModule { }
