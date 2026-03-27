import { Module } from '@nestjs/common';
import { PackageTierMapController } from './package-tier-map.controller';
import { PackageTierMapService } from './package-tier-map.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageTierMapEntity } from './entities/package-tier-map.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageTierMapEntity])
  ],
  controllers: [PackageTierMapController],
  providers: [PackageTierMapService]
})
export class PackageTierMapModule { }
