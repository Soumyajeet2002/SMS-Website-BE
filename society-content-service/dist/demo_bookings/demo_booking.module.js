"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoSlotBookingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const demo_booking_entities_1 = require("./entities/demo_booking.entities");
const slot_schedule_entities_1 = require("../demo_slot_schedule/entities/slot-schedule.entities");
const guest_users_entities_1 = require("../guest_users/entities/guest-users.entities");
const demo_booking_service_1 = require("./demo_booking.service");
const demo_booking_controller_1 = require("./demo_booking.controller");
let DemoSlotBookingModule = class DemoSlotBookingModule {
};
exports.DemoSlotBookingModule = DemoSlotBookingModule;
exports.DemoSlotBookingModule = DemoSlotBookingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                demo_booking_entities_1.DemoSlotBookingEntity,
                slot_schedule_entities_1.DemoSlotScheduleEntity,
                guest_users_entities_1.GuestUserEntity,
            ]),
        ],
        controllers: [demo_booking_controller_1.DemoSlotBookingController],
        providers: [demo_booking_service_1.DemoSlotBookingService],
        exports: [demo_booking_service_1.DemoSlotBookingService],
    })
], DemoSlotBookingModule);
//# sourceMappingURL=demo_booking.module.js.map