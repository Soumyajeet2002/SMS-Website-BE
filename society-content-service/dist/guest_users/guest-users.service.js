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
var GuestUsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestUsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_validator_1 = require("class-validator");
const crypto_1 = require("crypto");
const guest_users_entities_1 = require("./entities/guest-users.entities");
const guest_users_response_mapper_1 = require("./mapper/guest-users.response.mapper");
const guest_user_getAllresponse_mapper_1 = require("./mapper/guest-user.getAllresponse.mapper");
const specific_msg_1 = require("../common/messages/specific.msg");
const demo_booking_entities_1 = require("../demo_bookings/entities/demo_booking.entities");
const demo_booking_entities_2 = require("../demo_bookings/entities/demo_booking.entities");
let GuestUsersService = GuestUsersService_1 = class GuestUsersService {
    sqlRepo;
    bookingRepo;
    logger = new common_1.Logger(GuestUsersService_1.name);
    constructor(sqlRepo, bookingRepo) {
        this.sqlRepo = sqlRepo;
        this.bookingRepo = bookingRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createGuestUserSql.bind(this),
            findAll: this._findAllSql.bind(this),
            findOne: this._findOneSql.bind(this),
            update: this._updateSql.bind(this),
            remove: this._removeSql.bind(this),
        };
        const method = methodMap[fn];
        if (!method) {
            throw new Error(`Invalid function: ${fn}`);
        }
        return method(...args);
    }
    async _createGuestUserSql(dto) {
        try {
            const guestId = (0, crypto_1.randomUUID)();
            const existingSlot = await this.sqlRepo.findOne({
                where: {
                    mobileNo: dto.mobileNo,
                },
            });
            if (existingSlot) {
                throw new common_1.ConflictException(specific_msg_1.GUEST_USERS.ERRORS.DUPLICATE_GUEST_USER);
            }
            const entity = this.sqlRepo.create({
                guestId: guestId,
                ...dto,
                createdBy: guestId,
            });
            const saved = await this.sqlRepo.save(entity);
            console.log('Saved Guest User:', saved);
            await this.bookingRepo.save({
                guestId: saved.guestId,
                bookingStatus: demo_booking_entities_1.BookingStatus.PENDING,
                createdBy: saved.guestId,
            });
            return {
                message: specific_msg_1.GUEST_USERS.SUCCESS.GUEST_USER_CREATED,
                data: (0, guest_users_response_mapper_1.guestUserResMapperSql)(saved),
            };
        }
        catch (error) {
            this.logger.error('Create Guest User Failed', error);
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(specific_msg_1.GUEST_USERS.ERRORS.CREATE_FAILED);
        }
    }
    async _findAllSql(query) {
        try {
            const qb = this.sqlRepo.createQueryBuilder('guestUser');
            qb.where('guestUser.status != :deleted', { deleted: 2 });
            if (query.search) {
                qb.andWhere(`(guestUser.fullName ILIKE :search 
          OR guestUser.email ILIKE :search 
          OR guestUser.mobileNo ILIKE :search)`, { search: `%${query.search}%` });
            }
            if (query.bookingStatus !== undefined) {
                qb.leftJoin(demo_booking_entities_2.DemoSlotBookingEntity, 'booking', 'booking.guest_id = guestUser.guestId');
                qb.andWhere('booking.booking_status = :bookingStatus', {
                    bookingStatus: query.bookingStatus,
                });
            }
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const skip = (page - 1) * limit;
            const allowedSort = ['createdAt', 'fullName', 'email'];
            const sortBy = allowedSort.includes(query.sortBy || '')
                ? query.sortBy
                : 'createdAt';
            const sortOrder = query.sortOrder || 'DESC';
            qb.orderBy(`guestUser.${sortBy}`, sortOrder)
                .skip(skip)
                .take(limit);
            const [data, total] = await qb.getManyAndCount();
            const guests = await qb.getMany();
            const guestIds = guests.map((g) => g.guestId);
            const bookings = await this.bookingRepo.find({
                select: ['guestId', 'bookingStatus'],
            });
            console.log('Bookings:', bookings);
            const bookingMap = new Map(bookings.map((b) => [b.guestId, b.bookingStatus]));
            const result = data.map((guest) => (0, guest_user_getAllresponse_mapper_1.guestUserGetAllResMapperSql)(guest, bookingMap));
            return {
                message: specific_msg_1.GUEST_USERS.SUCCESS.GUEST_USER_FETCHED,
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: result,
            };
        }
        catch (error) {
            this.logger.error('Fetch Guest Users Failed', error);
            throw new common_1.InternalServerErrorException(specific_msg_1.GUEST_USERS.ERRORS.FETCH_FAILED);
        }
    }
    async _findOneSql(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException(specific_msg_1.GUEST_USERS.ERRORS.INVALID_GUEST_USER_ID);
        }
        try {
            const guestUser = await this.sqlRepo.findOne({
                where: { guestId: id, status: 1 },
            });
            if (!guestUser) {
                throw new common_1.NotFoundException(specific_msg_1.GUEST_USERS.ERRORS.GUEST_USER_NOT_FOUND);
            }
            return {
                message: specific_msg_1.GUEST_USERS.SUCCESS.GUEST_USER_FETCHED,
                data: (0, guest_users_response_mapper_1.guestUserResMapperSql)(guestUser),
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error('Fetch Guest User Failed', error);
            throw new common_1.InternalServerErrorException(specific_msg_1.GUEST_USERS.ERRORS.FETCH_FAILED);
        }
    }
    async _updateSql(id, dto) {
        try {
            delete dto.createdBy;
            delete dto.createdAt;
            await this._findOneSql(id);
            await this.sqlRepo.update({ guestId: id }, {
                ...dto,
                updatedBy: id,
            });
            const updated = await this._findOneSql(id);
            return {
                message: specific_msg_1.GUEST_USERS.SUCCESS.GUEST_USER_UPDATED,
                data: updated.data,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error('Update Guest User Failed', error);
            throw new common_1.InternalServerErrorException(specific_msg_1.GUEST_USERS.ERRORS.UPDATE_FAILED);
        }
    }
    async _removeSql(id) {
        try {
            await this._findOneSql(id);
            await this.sqlRepo.delete({ guestId: id });
            return {
                message: specific_msg_1.GUEST_USERS.SUCCESS.GUEST_USER_DELETED,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error('Delete Guest User Failed', error);
            throw new common_1.InternalServerErrorException(specific_msg_1.GUEST_USERS.ERRORS.DELETE_FAILED);
        }
    }
};
exports.GuestUsersService = GuestUsersService;
exports.GuestUsersService = GuestUsersService = GuestUsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(guest_users_entities_1.GuestUserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(demo_booking_entities_2.DemoSlotBookingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GuestUsersService);
//# sourceMappingURL=guest-users.service.js.map