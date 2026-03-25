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
exports.DemoSlotMasterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const demo_slot_master_service_1 = require("./demo_slot_master.service");
const create_demo_slot_dto_1 = require("./dto/create-demo-slot.dto");
const update_demo_slot_dto_1 = require("./dto/update-demo-slot.dto");
const query_demo_slot_dto_1 = require("./dto/query-demo-slot.dto");
let DemoSlotMasterController = class DemoSlotMasterController {
    demoSlotMasterService;
    constructor(demoSlotMasterService) {
        this.demoSlotMasterService = demoSlotMasterService;
    }
    createPublic(data, req) {
        return this.demoSlotMasterService.executeByActionType('create', data, req);
    }
    findAll(query) {
        return this.demoSlotMasterService.executeByActionType('findAll', query);
    }
    findOne(id) {
        return this.demoSlotMasterService.executeByActionType('findOne', id);
    }
    update(id, updateDto) {
        return this.demoSlotMasterService.executeByActionType('update', id, updateDto);
    }
    remove(id) {
        return this.demoSlotMasterService.executeByActionType('remove', id);
    }
};
exports.DemoSlotMasterController = DemoSlotMasterController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new demo slot (Public)' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)('demo-slot'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_demo_slot_dto_1.CreateDemoSlotDto, Object]),
    __metadata("design:returntype", void 0)
], DemoSlotMasterController.prototype, "createPublic", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all demo slots with pagination and search' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_demo_slot_dto_1.QueryDemoSlotDto]),
    __metadata("design:returntype", void 0)
], DemoSlotMasterController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Get demo slot by ID' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemoSlotMasterController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Update demo slot by ID' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_demo_slot_dto_1.UpdateDemoSlotDto]),
    __metadata("design:returntype", void 0)
], DemoSlotMasterController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete demo slot by ID' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DemoSlotMasterController.prototype, "remove", null);
exports.DemoSlotMasterController = DemoSlotMasterController = __decorate([
    (0, swagger_1.ApiTags)('Demo Slot Master'),
    (0, common_1.Controller)('demo-slot-master'),
    __metadata("design:paramtypes", [demo_slot_master_service_1.DemoSlotMasterService])
], DemoSlotMasterController);
//# sourceMappingURL=demo_slot_master.controller.js.map