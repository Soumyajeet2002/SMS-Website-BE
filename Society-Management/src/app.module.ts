import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 👈 Add ConfigService here
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from './config/database.module';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './common/security/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { CommuteModule } from './commute-service/commuteService.module';
import { AppService } from './app.service';
import { SocietyDetailsModule } from './society-details/society-details.module';
import { UserSocietyMapModule } from './user-society-map/user-society-map.module';
import { AmenityTierCategoryMapModule } from './amenity-tier-category-map/amenity-tier-category-map.module';
import { CategoryAmenityMapModule } from './category-amenity-map/category-amenity-map.module';
import { PackageTierMapModule } from './package-tier-map/package-tier-map.module';
import { FlatServiceModule } from './flat-service/flat-service.module';
import { SecureSecretsService } from './common/service/secure-secrete.service';
import { MediaModule } from './media/media.module';
import { RolesGuard } from './common/security/guards/role.guard';
import { JwtAuthGuard } from './common/security/guards/jwt-auth.guard';
import { SocietyAdminModule } from './society-admin/society-admin.module';
import { SocietyAmenityMappingsModule } from './society-amenity-mappings/society-amenity-mappings.module';
import { ResidentDetailsModule } from './resident-details/resident-details.module';
import { SecurityGuardsModule } from './security-guards/security-guards.module';

import { VendorDetailsModule } from './vendor-details/vendor-details.module';
import { VehicleModule } from './vehicle_registration/vehicle-registration.module';
import { ParkingSlotModule } from './parking-slot-management/parking-slot-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
      cache: true,
    }),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    CacheModule.register({ isGlobal: true }),
    DatabaseModule,
    CommuteModule,
    SocietyDetailsModule,
    UserSocietyMapModule,
    // AmenityTierCategoryMapModule,
    CategoryAmenityMapModule,
    PackageTierMapModule,
    FlatServiceModule,
    MediaModule,
    SocietyAdminModule,
    SocietyAmenityMappingsModule,
    ResidentDetailsModule,
    SecurityGuardsModule,
    VendorDetailsModule,
    VehicleModule,
    ParkingSlotModule,
  ],
  providers: [
    JwtStrategy,
    AppService,
    SecureSecretsService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
