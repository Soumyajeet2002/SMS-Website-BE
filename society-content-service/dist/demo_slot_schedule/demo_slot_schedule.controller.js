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
exports.DemoSlotScheduleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const demo_slot_schedule_service_1 = require("./demo_slot_schedule.service");
const create_slot_dto_1 = require("./dto/create-slot.dto");
const query_slot_dto_1 = require("./dto/query-slot.dto");
const update_slot_dto_1 = require("./dto/update-slot.dto");
const delete_dto_1 = require("./dto/delete.dto");
let DemoSlotScheduleController = class DemoSlotScheduleController {
    demoSlotScheduleService;
    constructor(demoSlotScheduleService) {
        this.demoSlotScheduleService = demoSlotScheduleService;
    }
    create(dto, req) {
        return this.demoSlotScheduleService.executeByActionType('create', dto, req);
    }
    getBookedSlots(demoBy, date) {
        return this.demoSlotScheduleService.getBookedSlots(demoBy, date);
    }
    findAll(dto) {
        return this.demoSlotScheduleService.executeByActionType('findAll', dto);
    }
    findOne(id) {
        return this.demoSlotScheduleService.executeByActionType('findOne', id);
    }
    update(dto) {
        return this.demoSlotScheduleService.executeByActionType('update', dto);
    }
    remove(dto) {
        return this.demoSlotScheduleService.executeByActionType('remove', dto);
    }
};
exports.DemoSlotScheduleController = DemoSlotScheduleController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a slot schedule' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_slot_dto_1.CreateSlotScheduleDto, Object]),
    __metadata("design:returntype", void 0)
], DemoSlotScheduleController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Get booked slots by demoBy and date' }),
    (0, common_1.Get)('slots-status'),
    __param(0, (0, common_1.Query)('demoBy')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DemoSlotScheduleController.prototype, "getBookedSlots", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all slot schedules with pagination' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_slot_dto_1.GetScheduleQueryDto]),
    __metadata("design:returntype", void 0)
], DemoSlotScheduleController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Slot Details with DemoID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('demoBy_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemoSlotScheduleController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Update slot schedule by ID' }),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_slot_dto_1.UpdateSlotScheduleDto]),
    __metadata("design:returntype", void 0)
], DemoSlotScheduleController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete' }),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_dto_1.DeleteScheduleDto]),
    __metadata("design:returntype", void 0)
], DemoSlotScheduleController.prototype, "remove", null);
exports.DemoSlotScheduleController = DemoSlotScheduleController = __decorate([
    (0, swagger_1.ApiTags)('Demo Slot Schedule'),
    (0, common_1.Controller)('demo-slot-schedule'),
    __metadata("design:paramtypes", [demo_slot_schedule_service_1.DemoSlotScheduleService])
], DemoSlotScheduleController);
//# sourceMappingURL=demo_slot_schedule.controller.js.map