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
exports.VehicleController = void 0;
const common_1 = require("@nestjs/common");
const query_vehicle_registration_dto_1 = require("./dto/query-vehicle-registration.dto");
const swagger_1 = require("@nestjs/swagger");
const vehicle_registration_service_1 = require("./vehicle-registration.service");
const create_vehicle_registration_dto_1 = require("./dto/create-vehicle-registration.dto");
const update_vehicle_dto_1 = require("./dto/update-vehicle.dto");
let VehicleController = class VehicleController {
    vehicleService;
    constructor(vehicleService) {
        this.vehicleService = vehicleService;
    }
    async createVehicle(body, req) {
        const userId = req.user?.id;
        return this.vehicleService.executeByActionType('create', body, userId);
    }
    findAll(dto) {
        return this.vehicleService.executeByActionType('getByResident', dto);
    }
    async updateVehiclesByResident(residentId, body) {
        return this.vehicleService._updateVehiclesByResident(residentId, body);
    }
};
exports.VehicleController = VehicleController;
__decorate([
    (0, common_1.Post)('create-vehicle'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new vehicle' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicle_registration_dto_1.CreateVehicleDto, Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "createVehicle", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all vehicles with pagination and filters' }),
    (0, common_1.Get)('get-all-data'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_vehicle_registration_dto_1.GetVehicleQueryDto]),
    __metadata("design:returntype", void 0)
], VehicleController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Patch vehicle details by residentId' }),
    (0, common_1.Patch)(':residentId'),
    __param(0, (0, common_1.Param)('residentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vehicle_dto_1.UpdateVehicleBulkDto]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "updateVehiclesByResident", null);
exports.VehicleController = VehicleController = __decorate([
    (0, swagger_1.ApiTags)('Vehicle Registration'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('vehicles'),
    __metadata("design:paramtypes", [vehicle_registration_service_1.VehicleService])
], VehicleController);
//# sourceMappingURL=vehicle-registration.controller.js.map