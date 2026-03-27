import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VendorDetailsEntity } from './entities/vendor-details.entities';
import { VendorDetailsService } from './vendor-details.service';
import { VendorDetailsController } from './vendor-details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VendorDetailsEntity])],
  controllers: [VendorDetailsController],
  providers: [VendorDetailsService],
  exports: [VendorDetailsService],
})
export class VendorDetailsModule {}
