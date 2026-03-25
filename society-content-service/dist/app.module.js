"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const database_module_1 = require("./config/database.module");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./common/security/jwt.strategy");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const commuteService_module_1 = require("./commute-service/commuteService.module");
const app_service_1 = require("./app.service");
const secure_secret_service_1 = require("./common/services/secure-secret.service");
const jwt_auth_guard_1 = require("./common/security/guards/jwt-auth.guard");
const role_guard_1 = require("./common/security/guards/role.guard");
const content_service_module_1 = require("./content/content-service.module");
const guest_users_module_1 = require("./guest_users/guest-users.module");
const demo_slot_master_module_1 = require("./demo_slot_master/demo_slot_master.module");
const demo_slot_schedule_module_1 = require("./demo_slot_schedule/demo_slot_schedule.module");
const demo_booking_module_1 = require("./demo_bookings/demo_booking.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                expandVariables: true,
                cache: true,
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            cache_manager_1.CacheModule.register({ isGlobal: true }),
            database_module_1.DatabaseModule,
            commuteService_module_1.CommuteModule,
            content_service_module_1.ContentModule,
            guest_users_module_1.GuestUsersModule,
            demo_slot_master_module_1.DemoSlotMasterModule,
            demo_slot_schedule_module_1.DemoSlotScheduleModule,
            demo_booking_module_1.DemoSlotBookingModule,
        ],
        providers: [
            jwt_strategy_1.JwtStrategy,
            app_service_1.AppService,
            secure_secret_service_1.SecureSecretsService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RolesGuard,
            },
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map