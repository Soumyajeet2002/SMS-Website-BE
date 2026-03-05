import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentEntity } from './entities/content.entity';
import { ContentService } from './content-service.service';
import { ContentController } from './content-service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntity])],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService], // optional (only if used in other modules)
})
export class ContentModule {}
