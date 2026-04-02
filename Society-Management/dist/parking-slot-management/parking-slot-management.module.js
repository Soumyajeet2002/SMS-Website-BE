"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSlotModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const parking_slot_management_entities_1 = require("./entities/parking-slot-management.entities");
const parking_slot_management_service_1 = require("./parking-slot-management.service");
const parking_slot_management_controller_1 = require("./parking-slot-management.controller");
const vehicle_registration_entities_1 = require("../vehicle_registration/entities/vehicle_registration.entities");
let ParkingSlotModule = class ParkingSlotModule {
};
exports.ParkingSlotModule = ParkingSlotModule;
exports.ParkingSlotModule = ParkingSlotModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([parking_slot_management_entities_1.ParkingSlotEntity, vehicle_registration_entities_1.VehicleRegistrationEntity]),
        ],
        controllers: [parking_slot_management_controller_1.ParkingSlotController],
        providers: [parking_slot_management_service_1.ParkingSLotManagementService],
        exports: [parking_slot_management_service_1.ParkingSLotManagementService],
    })
], ParkingSlotModule);
//# sourceMappingURL=parking-slot-management.module.js.map