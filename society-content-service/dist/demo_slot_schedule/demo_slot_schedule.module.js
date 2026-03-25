"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoSlotScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const demo_slot_schedule_controller_1 = require("./demo_slot_schedule.controller");
const demo_slot_schedule_service_1 = require("./demo_slot_schedule.service");
const slot_schedule_entities_1 = require("./entities/slot-schedule.entities");
const demo_slot_entities_1 = require("../demo_slot_master/entities/demo-slot.entities");
const demo_booking_entities_1 = require("../demo_bookings/entities/demo_booking.entities");
let DemoSlotScheduleModule = class DemoSlotScheduleModule {
};
exports.DemoSlotScheduleModule = DemoSlotScheduleModule;
exports.DemoSlotScheduleModule = DemoSlotScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                slot_schedule_entities_1.DemoSlotScheduleEntity,
                demo_slot_entities_1.DemoSlotMasterEntity,
                demo_booking_entities_1.DemoSlotBookingEntity,
            ]),
        ],
        controllers: [demo_slot_schedule_controller_1.DemoSlotScheduleController],
        providers: [demo_slot_schedule_service_1.DemoSlotScheduleService],
        exports: [demo_slot_schedule_service_1.DemoSlotScheduleService],
    })
], DemoSlotScheduleModule);
//# sourceMappingURL=demo_slot_schedule.module.js.map