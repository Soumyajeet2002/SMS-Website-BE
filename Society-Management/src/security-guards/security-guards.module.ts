import { Module } from '@nestjs/common';
import { SecurityGuardsController } from './security-guards.controller';
import { SecurityGuardsService } from './security-guards.service';
import { SocietySetupDetailsEntity } from '../society-details/entities/society-details.entity';
import { SecurityGuardsEntity } from './entities/security-guards.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([SecurityGuardsEntity, SocietySetupDetailsEntity])],
  controllers: [SecurityGuardsController],
  providers: [SecurityGuardsService],
})
export class SecurityGuardsModule {}
