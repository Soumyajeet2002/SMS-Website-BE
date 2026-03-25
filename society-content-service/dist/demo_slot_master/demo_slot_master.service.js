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
var DemoSlotMasterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoSlotMasterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_validator_1 = require("class-validator");
const crypto_1 = require("crypto");
const demo_slot_entities_1 = require("./entities/demo-slot.entities");
const demo_slot_response_mapper_1 = require("./mapper/demo-slot.response.mapper");
const specific_msg_1 = require("../common/messages/specific.msg");
const common_2 = require("@nestjs/common");
let DemoSlotMasterService = DemoSlotMasterService_1 = class DemoSlotMasterService {
    sqlRepo;
    logger = new common_1.Logger(DemoSlotMasterService_1.name);
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createSlot.bind(this),
            findAll: this._findAllSlots.bind(this),
            findOne: this._findOneSlot.bind(this),
            update: this._updateSlot.bind(this),
            remove: this._removeSlot.bind(this),
        };
        const method = methodMap[fn];
        if (!method) {
            throw new Error(`Invalid function: ${fn}`);
        }
        return method(...args);
    }
    async _createSlot(dto, req) {
        try {
            const slotId = (0, crypto_1.randomUUID)();
            const existingSlot = await this.sqlRepo.findOne({
                where: {
                    startTime: dto.startTime,
                    endTime: dto.endTime,
                },
            });
            if (existingSlot) {
                throw new common_2.ConflictException(specific_msg_1.DEMO_SLOT_MASTER.ERRORS.DUPLICATE_SLOT);
            }
            const entity = this.sqlRepo.create({
                slotId,
                ...dto,
                createdBy: req?.user?.id || slotId,
            });
            const saved = await this.sqlRepo.save(entity);
            return {
                message: specific_msg_1.DEMO_SLOT_MASTER.SUCCESS.SLOT_CREATED,
                data: (0, demo_slot_response_mapper_1.demoSlotResMapperSql)(saved),
            };
        }
        catch (error) {
            this.logger.error('Create Demo Slot Failed', error);
            if (error instanceof common_2.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(specific_msg_1.DEMO_SLOT_MASTER.ERRORS.CREATE_FAILED);
        }
    }
    async _findAllSlots(query) {
        try {
            const qb = this.sqlRepo.createQueryBuilder('slot');
            qb.where('slot.status != :deleted', { deleted: demo_slot_entities_1.SlotStatus.DELETED });
            if (query.search) {
                qb.andWhere('slot.slotName ILIKE :search', {
                    search: `%${query.search}%`,
                });
            }
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const skip = (page - 1) * limit;
            const allowedSort = ['createdAt', 'slotName', 'startTime'];
            const sortBy = allowedSort.includes(query.sortBy || '')
                ? query.sortBy
                : 'createdAt';
            const sortOrder = query.sortOrder || 'DESC';
            qb.orderBy(`slot.${sortBy}`, sortOrder)
                .skip(skip)
                .take(limit);
            const [data, total] = await qb.getManyAndCount();
            return {
                message: specific_msg_1.DEMO_SLOT_MASTER.SUCCESS.SLOTS_FETCHED,
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: data.map(demo_slot_response_mapper_1.demoSlotResMapperSql),
            };
        }
        catch (error) {
            this.logger.error('Fetch Demo Slots Failed', error);
            throw new common_1.InternalServerErrorException(specific_msg_1.DEMO_SLOT_MASTER.ERRORS.FETCH_FAILED);
        }
    }
    async _findOneSlot(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException(specific_msg_1.DEMO_SLOT_MASTER.ERRORS.INVALID_SLOT_ID);
        }
        try {
            const slot = await this.sqlRepo.findOne({
                where: { slotId: id },
            });
            if (!slot) {
                throw new common_1.NotFoundException(specific_msg_1.DEMO_SLOT_MASTER.ERRORS.SLOT_NOT_FOUND);
            }
            return {
                message: specific_msg_1.DEMO_SLOT_MASTER.SUCCESS.SLOT_FETCHED,
                data: (0, demo_slot_response_mapper_1.demoSlotResMapperSql)(slot),
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error('Fetch Demo Slot Failed', error);
            throw new common_1.InternalServerErrorException(specific_msg_1.DEMO_SLOT_MASTER.ERRORS.FETCH_FAILED);
        }
    }
    async _updateSlot(id, dto) {
        try {
            delete dto.createdBy;
            delete dto.createdAt;
            await this._findOneSlot(id);
            await this.sqlRepo.update({ slotId: id }, {
                ...dto,
                updatedBy: id,
            });
            const updated = await this._findOneSlot(id);
            return {
                message: specific_msg_1.DEMO_SLOT_MASTER.SUCCESS.SLOT_UPDATED,
                data: updated.data,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error('Update Demo Slot Failed', error);
            throw new common_1.InternalServerErrorException(specific_msg_1.DEMO_SLOT_MASTER.ERRORS.UPDATE_FAILED);
        }
    }
    async _removeSlot(id) {
        try {
            await this._findOneSlot(id);
            await this.sqlRepo.update({ slotId: id }, { status: demo_slot_entities_1.SlotStatus.DELETED });
            return {
                message: specific_msg_1.DEMO_SLOT_MASTER.SUCCESS.SLOT_DELETED,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error('Delete Demo Slot Failed', error);
            throw new common_1.InternalServerErrorException(specific_msg_1.DEMO_SLOT_MASTER.ERRORS.DELETE_FAILED);
        }
    }
};
exports.DemoSlotMasterService = DemoSlotMasterService;
exports.DemoSlotMasterService = DemoSlotMasterService = DemoSlotMasterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(demo_slot_entities_1.DemoSlotMasterEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DemoSlotMasterService);
//# sourceMappingURL=demo_slot_master.service.js.map