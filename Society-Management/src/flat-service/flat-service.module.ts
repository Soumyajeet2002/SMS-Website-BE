import { Module } from '@nestjs/common';
import { FlatServiceController } from './flat-service.controller';
import { FlatServiceService } from './flat-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { societyFlatListingEntity } from './entities/society-flat-listing.entity';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [TypeOrmModule.forFeature([societyFlatListingEntity]),MediaModule,],
  controllers: [FlatServiceController],
  providers: [FlatServiceService]
})
export class FlatServiceModule { }
