import { Module } from '@nestjs/common';
import { SocietyAdminController } from './society-admin.controller';
import { SocietyAdminService } from './society-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesMasterEntity } from '@sms/db-entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServicesMasterEntity
    ])
  ],
  controllers: [SocietyAdminController],
  providers: [SocietyAdminService]
})
export class SocietyAdminModule { }
