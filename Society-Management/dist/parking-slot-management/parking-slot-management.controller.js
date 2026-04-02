"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSlotController = void 0;
const common_1 = require("@nestjs/common");
const parking_slot_management_service_1 = require("./parking-slot-management.service");
const enter_parking_slot_dto_1 = require("./dto/enter-parking-slot.dto");
const query_parking_slot_dto_1 = require("./dto/query-parking-slot.dto");
const swagger_1 = require("@nestjs/swagger");
let ParkingSlotController = class ParkingSlotController {
    parkingService;
    constructor(parkingService) {
        this.parkingService = parkingService;
    }
    create(dto, req) {
        return this.parkingService.executeByActionType('create', dto, req.user.userId);
    }
    getAll(dto) {
        return this.parkingService.executeByActionType('getall', dto);
    }
};
exports.ParkingSlotController = ParkingSlotController;
__decorate([
    (0, common_1.Post)('enter-vehicle-into-parking-slot'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [enter_parking_slot_dto_1.CreateParkingSlotDto, Object]),
    __metadata("design:returntype", void 0)
], ParkingSlotController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('get-all-parking-slots'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_parking_slot_dto_1.GetParkingSlotsDto]),
    __metadata("design:returntype", void 0)
], ParkingSlotController.prototype, "getAll", null);
exports.ParkingSlotController = ParkingSlotController = __decorate([
    (0, common_1.Controller)('parking-slots'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __metadata("design:paramtypes", [parking_slot_management_service_1.ParkingSLotManagementService])
], ParkingSlotController);
//# sourceMappingURL=parking-slot-management.controller.js.map