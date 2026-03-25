"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestUsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const guest_users_controller_1 = require("./guest-users.controller");
const guest_users_service_1 = require("./guest-users.service");
const guest_users_entities_1 = require("./entities/guest-users.entities");
const demo_booking_entities_1 = require("../demo_bookings/entities/demo_booking.entities");
let GuestUsersModule = class GuestUsersModule {
};
exports.GuestUsersModule = GuestUsersModule;
exports.GuestUsersModule = GuestUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([guest_users_entities_1.GuestUserEntity, demo_booking_entities_1.DemoSlotBookingEntity])],
        controllers: [guest_users_controller_1.GuestUsersController],
        providers: [guest_users_service_1.GuestUsersService],
        exports: [guest_users_service_1.GuestUsersService],
    })
], GuestUsersModule);
//# sourceMappingURL=guest-users.module.js.map