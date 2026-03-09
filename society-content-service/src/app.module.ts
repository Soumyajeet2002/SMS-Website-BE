import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Add ConfigService here
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from './config/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './common/security/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { CommuteModule } from './commute-service/commuteService.module';
import { AppService } from './app.service';
import { SecureSecretsService } from './common/services/secure-secret.service';
import { JwtAuthGuard } from './common/security/guards/jwt-auth.guard';
import { RolesGuard } from './common/security/guards/role.guard';
import { ContentModule } from './content/content-service.module';
import { GuestUsersModule } from './guest_users/guest-users.module';

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
    ContentModule,
    GuestUsersModule,
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
