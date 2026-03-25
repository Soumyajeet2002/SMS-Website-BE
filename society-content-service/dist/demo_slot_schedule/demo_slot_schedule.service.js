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
var DemoSlotScheduleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoSlotScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_validator_1 = require("class-validator");
const slot_schedule_entities_1 = require("./entities/slot-schedule.entities");
const specific_msg_1 = require("../common/messages/specific.msg");
const demo_slot_entities_1 = require("../demo_slot_master/entities/demo-slot.entities");
const common_2 = require("@nestjs/common");
const typeorm_3 = require("typeorm");
const demo_booking_entities_1 = require("../demo_bookings/entities/demo_booking.entities");
let DemoSlotScheduleService = DemoSlotScheduleService_1 = class DemoSlotScheduleService {
    sqlRepo;
    slotRepo;
    bookingRepo;
    logger = new common_1.Logger(DemoSlotScheduleService_1.name);
    constructor(sqlRepo, slotRepo, bookingRepo) {
        this.sqlRepo = sqlRepo;
        this.slotRepo = slotRepo;
        this.bookingRepo = bookingRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createSchedule.bind(this),
            findAll: this._findAllSchedules.bind(this),
            findOne: this._findOneSchedule.bind(this),
            update: this._updateSchedule.bind(this),
            remove: this._removeSchedule.bind(this),
        };
        const method = methodMap[fn];
        if (!method) {
            throw new Error(`Invalid function: ${fn}`);
        }
        return method(...args);
    }
    async _createSchedule(dto, req) {
        try {
            const entities = [];
            for (const slotItem of dto.slots) {
                if (!(0, class_validator_1.isUUID)(slotItem.slotId)) {
                    throw new common_1.BadRequestException(`Invalid Slot ID: ${slotItem.slotId}`);
                }
                const slot = await this.slotRepo.findOne({
                    where: { slotId: slotItem.slotId },
                });
                if (!slot) {
                    throw new common_1.NotFoundException(`Slot Master Not Found: ${slotItem.slotId}`);
                }
                const existing = await this.sqlRepo.findOne({
                    where: {
                        slotDate: dto.slotDate,
                        slot: { slotId: slotItem.slotId },
                        demoBy: dto.demoBy,
                        status: (0, typeorm_3.Not)(slot_schedule_entities_1.SlotScheduleStatus.DELETED),
                    },
                });
                if (existing) {
                    throw new common_2.ConflictException(`Slot already scheduled for this date: ${slotItem.slotId}`);
                }
                const entity = this.sqlRepo.create({
                    slotDate: dto.slotDate,
                    slot,
                    demoBy: dto.demoBy,
                    status: dto.status ?? slot_schedule_entities_1.SlotScheduleStatus.ACTIVE,
                    createdBy: req?.user?.id,
                });
                entities.push(entity);
            }
            const saved = await this.sqlRepo.save(entities);
            const response = {
                demoBy: dto.demoBy,
                slotDate: dto.slotDate,
                status: dto.status ?? slot_schedule_entities_1.SlotScheduleStatus.ACTIVE,
                slots: saved.map((s) => ({
                    slotId: s.slot.slotId,
                    slotName: s.slot.slotName,
                })),
            };
            return {
                message: 'Slot schedules created successfully',
                data: response,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error('Create Slot Schedule Failed', error);
            throw new common_1.InternalServerErrorException('Failed to create slot schedules');
        }
    }
    async _findAllSchedules(query) {
        try {
            const qb = this.sqlRepo
                .createQueryBuilder('schedule')
                .leftJoinAndSelect('schedule.slot', 'slot')
                .leftJoin((qb) => qb
                .select('u.id', 'id')
                .addSelect('u.name', 'name')
                .from('identity.users', 'u'), 'usr', 'usr.id = schedule.demoBy')
                .addSelect('usr.name', 'demoByName');
            qb.where('schedule.status != :deleted', {
                deleted: slot_schedule_entities_1.SlotScheduleStatus.DELETED,
            });
            if (query.demoBy) {
                if ((0, class_validator_1.isUUID)(query.demoBy)) {
                    qb.andWhere('schedule.demoBy = :demoBy', {
                        demoBy: query.demoBy,
                    });
                }
                else {
                    qb.andWhere('usr.name ILIKE :demoBy', {
                        demoBy: `%${query.demoBy}%`,
                    });
                }
            }
            if (query.date) {
                qb.andWhere('schedule.slotDate = :date', {
                    date: query.date,
                });
            }
            if (query.search) {
                qb.andWhere('slot.slotName ILIKE :search', {
                    search: `%${query.search}%`,
                });
            }
            const allowedSort = ['createdAt', 'slotDate'];
            const sortBy = allowedSort.includes(query.sortBy || '')
                ? query.sortBy
                : 'createdAt';
            const sortOrder = query.sortOrder || 'DESC';
            qb.orderBy(`schedule.${sortBy}`, sortOrder);
            if (query.status) {
                qb.andWhere('schedule.status = :status', {
                    status: query.status,
                });
            }
            const { entities, raw } = await qb.getRawAndEntities();
            const rows = entities.map((entity, index) => ({
                ...entity,
                demoByName: raw[index]?.demoByName,
            }));
            const scheduleIds = rows.map((r) => r.scheduleId);
            const groupedMap = new Map();
            rows.forEach((row) => {
                const key = `${row.slotDate}_${row.demoByName ?? row.demoBy}`;
                if (!groupedMap.has(key)) {
                    groupedMap.set(key, {
                        slotDate: row.slotDate,
                        demoBy: row.demoByName ?? row.demoBy,
                        demoById: row.demoBy,
                        slots: [],
                    });
                }
                groupedMap.get(key).slots.push({
                    scheduleId: row.scheduleId,
                    slotId: row.slot?.slotId,
                    slotName: row.slot?.slotName,
                    status: row.status,
                });
            });
            let data = Array.from(groupedMap.values());
            const total = data.length;
            const page = Number(query.page) || 1;
            const limit = query.limit ? Number(query.limit) : null;
            if (limit) {
                const start = (page - 1) * limit;
                const end = start + limit;
                data = data.slice(start, end);
            }
            return {
                message: specific_msg_1.DEMO_SLOT_SCHEDULE.SUCCESS.SCHEDULES_FETCHED,
                page,
                limit,
                total,
                totalPages: limit ? Math.ceil(total / limit) : 1,
                data,
            };
        }
        catch (error) {
            this.logger.error('Fetch Slot Schedules Failed', error);
            throw new common_1.InternalServerErrorException(specific_msg_1.DEMO_SLOT_SCHEDULE.ERRORS.FETCH_FAILED);
        }
    }
    async _findOneSchedule(demoBy) {
        try {
            const qb = this.sqlRepo
                .createQueryBuilder('schedule')
                .leftJoinAndSelect('schedule.slot', 'slot')
                .leftJoin((qb) => qb
                .select('u.id', 'id')
                .addSelect('u.name', 'name')
                .from('identity.users', 'u'), 'usr', 'usr.id = schedule.demoBy')
                .addSelect('usr.name', 'demoByName')
                .where('schedule.demoBy = :demoBy', { demoBy })
                .andWhere('schedule.status = :status', {
                status: slot_schedule_entities_1.SlotScheduleStatus.ACTIVE,
            })
                .orderBy('schedule.slotDate', 'ASC');
            const { entities, raw } = await qb.getRawAndEntities();
            if (!entities.length) {
                throw new common_1.NotFoundException('Slot Schedule Not Found');
            }
            const rows = entities.map((entity, index) => ({
                ...entity,
                demoByName: raw[index]?.demoByName,
            }));
            const grouped = rows.reduce((acc, item) => {
                const date = item.slotDate;
                if (!acc[date]) {
                    acc[date] = {
                        date,
                        demoBy: item.demoByName ?? item.demoBy,
                        slots: [],
                    };
                }
                acc[date].slots.push({
                    slotId: item.slot.slotId,
                    slotName: item.slot.slotName,
                    startTime: item.slot.startTime,
                    endTime: item.slot.endTime,
                });
                return acc;
            }, {});
            return {
                message: 'Slot schedules fetched',
                data: Object.values(grouped),
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error('Fetch Slot Schedule Failed', error);
            throw new common_1.InternalServerErrorException('Failed to fetch slot schedule');
        }
    }
    async _updateSchedule(dto) {
        const queryRunner = this.sqlRepo.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (!dto.slots || !dto.slots.length) {
                throw new common_1.BadRequestException('Slots are required');
            }
            const results = [];
            for (const slotItem of dto.slots) {
                const { scheduleId, slotId, status } = slotItem;
                const slot = await this.slotRepo.findOne({
                    where: { slotId },
                });
                if (!slot) {
                    throw new common_1.NotFoundException(`Slot Master Not Found: ${slotId}`);
                }
                if (scheduleId) {
                    if (!(0, class_validator_1.isUUID)(scheduleId)) {
                        throw new common_1.BadRequestException(`Invalid Schedule ID: ${scheduleId}`);
                    }
                    const existing = await queryRunner.manager.findOne(this.sqlRepo.target, {
                        where: { scheduleId },
                        relations: ['slot'],
                    });
                    if (!existing) {
                        throw new common_1.NotFoundException(`Slot Schedule Not Found: ${scheduleId}`);
                    }
                    existing.demoBy = dto.demoBy ?? existing.demoBy;
                    existing.slotDate = dto.slotDate ?? existing.slotDate;
                    existing.status = status ?? existing.status;
                    existing.slot = slot;
                    existing.updatedAt = new Date();
                    const saved = await queryRunner.manager.save(existing);
                    results.push(saved);
                }
                else {
                    const newSchedule = this.sqlRepo.create({
                        slot,
                        demoBy: dto.demoBy,
                        slotDate: dto.slotDate,
                        status: status ?? slot_schedule_entities_1.SlotScheduleStatus.ACTIVE,
                    });
                    const saved = await queryRunner.manager.save(newSchedule);
                    results.push(saved);
                }
            }
            await queryRunner.commitTransaction();
            return {
                message: 'Schedules processed successfully',
                data: results,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error('Update Slot Schedule Failed', error);
            throw new common_1.InternalServerErrorException('Failed to update slot schedule');
        }
        finally {
            await queryRunner.release();
        }
    }
    async _removeSchedule(dto) {
        try {
            const result = await this.sqlRepo.update({
                slotDate: dto.slotDate,
                demoBy: dto.demoBy,
            }, {
                status: slot_schedule_entities_1.SlotScheduleStatus.DELETED,
                updatedBy: dto.demoBy,
                updatedAt: new Date(),
            });
            if (!result.affected) {
                throw new common_1.NotFoundException('No Slot Schedules Found');
            }
            return {
                message: 'All slot schedules deleted successfully',
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error('Delete Slot Schedule Failed', error);
            throw new common_1.InternalServerErrorException('Failed to delete slot schedules');
        }
    }
    async getBookedSlots(demoBy, date) {
        try {
            if (!demoBy || !date) {
                throw new common_1.BadRequestException('demoBy and date are required');
            }
            const qb = this.sqlRepo
                .createQueryBuilder('schedule')
                .leftJoinAndSelect('schedule.slot', 'slot')
                .leftJoin((qb) => qb
                .select('u.id', 'id')
                .addSelect('u.name', 'name')
                .from('identity.users', 'u'), 'usr', 'usr.id = schedule.demoBy');
            if ((0, class_validator_1.isUUID)(demoBy)) {
                qb.where('schedule.demoBy = :demoBy', { demoBy });
            }
            else {
                qb.where('usr.name ILIKE :demoBy', {
                    demoBy: `%${demoBy}%`,
                });
            }
            qb.andWhere('schedule.slotDate = :date', { date });
            qb.andWhere('schedule.status IN (:...statuses)', {
                statuses: [slot_schedule_entities_1.SlotScheduleStatus.ACTIVE, slot_schedule_entities_1.SlotScheduleStatus.INACTIVE],
            });
            const bookedSlots = await qb.getMany();
            return {
                message: 'Booked slots fetched',
                data: bookedSlots.map((s) => ({
                    slotId: s.slot.slotId,
                    slotName: s.slot.slotName,
                    startTime: s.slot.startTime,
                    endTime: s.slot.endTime,
                    status: s.status,
                })),
            };
        }
        catch (error) {
            this.logger.error('Fetch Booked Slots Failed', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to fetch booked slots');
        }
    }
};
exports.DemoSlotScheduleService = DemoSlotScheduleService;
exports.DemoSlotScheduleService = DemoSlotScheduleService = DemoSlotScheduleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(slot_schedule_entities_1.DemoSlotScheduleEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(demo_slot_entities_1.DemoSlotMasterEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(demo_booking_entities_1.DemoSlotBookingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DemoSlotScheduleService);
//# sourceMappingURL=demo_slot_schedule.service.js.map