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
var DemoSlotBookingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoSlotBookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const demo_booking_entities_1 = require("./entities/demo_booking.entities");
const slot_schedule_entities_1 = require("../demo_slot_schedule/entities/slot-schedule.entities");
const guest_users_entities_1 = require("../guest_users/entities/guest-users.entities");
const slot_schedule_entities_2 = require("../demo_slot_schedule/entities/slot-schedule.entities");
const specific_msg_1 = require("../common/messages/specific.msg");
let DemoSlotBookingService = DemoSlotBookingService_1 = class DemoSlotBookingService {
    bookingRepo;
    scheduleRepo;
    guestRepo;
    sqlRepo;
    logger = new common_1.Logger(DemoSlotBookingService_1.name);
    constructor(bookingRepo, scheduleRepo, guestRepo, sqlRepo) {
        this.bookingRepo = bookingRepo;
        this.scheduleRepo = scheduleRepo;
        this.guestRepo = guestRepo;
        this.sqlRepo = sqlRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._GetSlotDetails.bind(this),
            update: this._updateBooking.bind(this),
        };
        const method = methodMap[fn];
        if (!method) {
            throw new Error(`Invalid function: ${fn}`);
        }
        return method(...args);
    }
    async _GetSlotDetails(req, demoBy) {
        try {
            const userId = req?.user?.id;
            const qb = this.sqlRepo
                .createQueryBuilder('schedule')
                .leftJoinAndSelect('schedule.slot', 'slot')
                .leftJoin((qb) => qb
                .select('u.id', 'id')
                .addSelect('u.name', 'name')
                .from('identity.users', 'u'), 'usr', 'usr.id = schedule.demoBy')
                .addSelect('usr.name', 'demoByName');
            qb.addSelect((subQuery) => {
                return subQuery
                    .select('1')
                    .from('society_cms.demo_bookings', 'b')
                    .where('b.schedule_id = schedule.schedule_id')
                    .limit(1);
            }, 'is_booked');
            qb.where('schedule.status != :deleted', {
                deleted: slot_schedule_entities_2.SlotScheduleStatus.DELETED,
            });
            if (userId) {
                qb.andWhere('schedule.createdBy = :userId', {
                    userId,
                });
            }
            if (demoBy) {
                qb.andWhere('schedule.demoBy = :demoBy', { demoBy });
            }
            qb.orderBy('schedule.createdAt', 'DESC');
            const page = 1;
            const limit = 10;
            qb.skip((page - 1) * limit).take(limit);
            const total = await qb.getCount();
            const { entities, raw } = await qb.getRawAndEntities();
            const data = entities.map((row, index) => {
                return {
                    schedule_id: row.scheduleId,
                    demoBy: row.demoBy,
                    demoByname: raw[index]?.demoByName,
                    slot_date: row.slotDate,
                    slot_id: row.slot?.slotId,
                    slot_name: row.slot?.slotName,
                    demoBy_id: row.demoBy,
                    start_time: row.slot?.startTime,
                    end_time: row.slot?.endTime,
                    schedule_status: row.status,
                    is_booked: raw[index]?.is_booked ? 1 : 0,
                };
            });
            return {
                message: specific_msg_1.DEMO_SLOT_SCHEDULE.SUCCESS.SCHEDULES_FETCHED,
                data: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    data,
                },
            };
        }
        catch (error) {
            this.logger.error('Fetch Slot Schedules Failed', error);
            throw new common_1.InternalServerErrorException(specific_msg_1.DEMO_SLOT_SCHEDULE.ERRORS.FETCH_FAILED);
        }
    }
    async _updateBooking(dto, req) {
        try {
            const { guestId, scheduleId, bookingStatus, meetingLink, metadata } = dto;
            if (!guestId) {
                throw new common_1.BadRequestException('guestId is required');
            }
            if (bookingStatus !== undefined &&
                !Object.values(demo_booking_entities_1.BookingStatus).includes(bookingStatus)) {
                throw new common_1.BadRequestException('Invalid booking status');
            }
            let booking = await this.bookingRepo.findOne({
                where: { guestId },
                order: { createdAt: 'DESC' },
            });
            if (!booking) {
                console.log('⚠️ Booking not found');
                if (!scheduleId && bookingStatus !== demo_booking_entities_1.BookingStatus.REJECTED) {
                    throw new common_1.BadRequestException('scheduleId is required unless rejecting booking');
                }
                console.log('🆕 Creating new booking...');
                const newBooking = this.bookingRepo.create({
                    guestId,
                    scheduleId: scheduleId ?? undefined,
                    bookingStatus,
                    meetingLink,
                    metadata,
                    createdBy: req?.user?.userId ?? 'SYSTEM',
                });
                await this.bookingRepo.save(newBooking);
                console.log('✅ Booking created successfully');
                return {
                    message: 'Booking created successfully',
                    data: newBooking,
                };
            }
            Object.assign(booking, {
                ...(scheduleId && !booking.scheduleId && { scheduleId }),
                bookingStatus: bookingStatus ?? booking.bookingStatus,
                meetingLink: meetingLink ?? booking.meetingLink,
                metadata: metadata ?? booking.metadata,
                updatedBy: req?.user?.userId ?? 'SYSTEM',
            });
            await this.bookingRepo.save(booking);
            console.log('✅ Booking updated successfully');
            let is_booked = 0;
            if (scheduleId) {
                const isBookedExists = await this.bookingRepo.exist({
                    where: { scheduleId },
                });
                is_booked = isBookedExists ? 1 : 0;
            }
            return {
                message: 'Booking updated successfully',
                data: {
                    bookingId: booking.bookingId,
                    guestId: booking.guestId,
                    scheduleId: booking.scheduleId,
                    bookingStatus: booking.bookingStatus,
                    is_booked,
                },
            };
        }
        catch (error) {
            console.error('🔥 ERROR in _updateBooking:', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.InternalServerErrorException(error.message || 'Failed to update booking');
        }
    }
};
exports.DemoSlotBookingService = DemoSlotBookingService;
exports.DemoSlotBookingService = DemoSlotBookingService = DemoSlotBookingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(demo_booking_entities_1.DemoSlotBookingEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(slot_schedule_entities_1.DemoSlotScheduleEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(guest_users_entities_1.GuestUserEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(slot_schedule_entities_1.DemoSlotScheduleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DemoSlotBookingService);
//# sourceMappingURL=demo_booking.service.js.map