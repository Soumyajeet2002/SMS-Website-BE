import { Module } from '@nestjs/common';
import { CategoryAmenityMapController } from './category-amenity-map.controller';
import { CategoryAmenityMapService } from './category-amenity-map.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryAmenityMapEntity } from './entities/category-amenity-map.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryAmenityMapEntity])
  ],
  controllers: [CategoryAmenityMapController],
  providers: [CategoryAmenityMapService]
})
export class CategoryAmenityMapModule { }
