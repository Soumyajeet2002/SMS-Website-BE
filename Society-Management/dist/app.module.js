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
const society_details_module_1 = require("./society-details/society-details.module");
const user_society_map_module_1 = require("./user-society-map/user-society-map.module");
const category_amenity_map_module_1 = require("./category-amenity-map/category-amenity-map.module");
const package_tier_map_module_1 = require("./package-tier-map/package-tier-map.module");
const flat_service_module_1 = require("./flat-service/flat-service.module");
const secure_secrete_service_1 = require("./common/service/secure-secrete.service");
const media_module_1 = require("./media/media.module");
const role_guard_1 = require("./common/security/guards/role.guard");
const jwt_auth_guard_1 = require("./common/security/guards/jwt-auth.guard");
const society_admin_module_1 = require("./society-admin/society-admin.module");
const society_amenity_mappings_module_1 = require("./society-amenity-mappings/society-amenity-mappings.module");
const resident_details_module_1 = require("./resident-details/resident-details.module");
const vendor_details_module_1 = require("./vendor-details/vendor-details.module");
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
            society_details_module_1.SocietyDetailsModule,
            user_society_map_module_1.UserSocietyMapModule,
            category_amenity_map_module_1.CategoryAmenityMapModule,
            package_tier_map_module_1.PackageTierMapModule,
            flat_service_module_1.FlatServiceModule,
            media_module_1.MediaModule,
            society_admin_module_1.SocietyAdminModule,
            society_amenity_mappings_module_1.SocietyAmenityMappingsModule,
            resident_details_module_1.ResidentDetailsModule,
            vendor_details_module_1.VendorDetailsModule,
        ],
        providers: [
            jwt_strategy_1.JwtStrategy,
            app_service_1.AppService,
            secure_secrete_service_1.SecureSecretsService,
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