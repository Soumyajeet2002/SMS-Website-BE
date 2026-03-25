"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoSlotMasterModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const demo_slot_master_controller_1 = require("./demo_slot_master.controller");
const demo_slot_master_service_1 = require("./demo_slot_master.service");
const demo_slot_entities_1 = require("./entities/demo-slot.entities");
let DemoSlotMasterModule = class DemoSlotMasterModule {
};
exports.DemoSlotMasterModule = DemoSlotMasterModule;
exports.DemoSlotMasterModule = DemoSlotMasterModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([demo_slot_entities_1.DemoSlotMasterEntity])],
        controllers: [demo_slot_master_controller_1.DemoSlotMasterController],
        providers: [demo_slot_master_service_1.DemoSlotMasterService],
        exports: [demo_slot_master_service_1.DemoSlotMasterService],
    })
], DemoSlotMasterModule);
//# sourceMappingURL=demo_slot_master.module.js.map