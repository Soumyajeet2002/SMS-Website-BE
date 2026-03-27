


import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocietySetupDetailsEntity } from './entities/society-details.entity';
import { SocietyDetailsController } from './society-details.controller';
import { SocietyDetailsService } from './society-details.service';
import { SocietyAuditService } from 'src/audit/society-audit.service';
import { SocietyAuditLog } from 'src/audit/audit-society.entity';
import { SocietyBlockEntity } from './entities/society-block.entity';
import { UsersEntity } from './entities/users.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([SocietySetupDetailsEntity,SocietyAuditLog,SocietyBlockEntity,UsersEntity]),
  ],
  controllers: [SocietyDetailsController],
  providers: [SocietyDetailsService, ConfigService,SocietyAuditService],
  exports: [SocietyDetailsService],
})
export class SocietyDetailsModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    Logger.log(
      `Society Details Module initialized with PostgreSQL`,
      'Society Details Module',
    );
  }
}
