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
var UserSocietyMapService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSocietyMapService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_society_map_entities_1 = require("./entities/user-society-map.entities");
const typeorm_2 = require("typeorm");
const user_society_request_mapper_1 = require("./mappers/user-society.request.mapper");
const specific_msg_1 = require("../common/messages/specific.msg");
const class_validator_1 = require("class-validator");
const user_society_response_mapper_1 = require("./mappers/user-society.response.mapper");
const user_society_getAll_response_1 = require("./mappers/user-society.getAll.response");
let UserSocietyMapService = UserSocietyMapService_1 = class UserSocietyMapService {
    sqlRepo;
    logger = new common_1.Logger(UserSocietyMapService_1.name);
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createSql.bind(this),
            findOneInternal: this._findOne.bind(this),
            find: this._findSql.bind(this),
            findAll: this._findAllSql.bind(this),
            update: this._updateSql.bind(this),
            remove: this._removeSql.bind(this),
        };
        const method = methodMap[fn];
        if (!method)
            throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }
    async _createSql(data, req) {
        const mappedEntity = (0, user_society_request_mapper_1.userSocietyReqMapper)(data);
        try {
            const existing = await this.sqlRepo.findOne({
                where: {
                    user_id: mappedEntity.user_id,
                    society_id: mappedEntity.society_id
                }
            });
            if (existing) {
                throw new common_1.ConflictException(specific_msg_1.USERSOCIETYMAP.ERRORS.ALREADY_MAPPED);
            }
            const entity = this.sqlRepo.create({ ...mappedEntity, created_by: req.user.userId });
            await this.sqlRepo.save(entity);
            return { success: true, message: specific_msg_1.USERSOCIETYMAP.SUCCESS.USERMAP_CREATED };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERSOCIETYMAP.ERRORS.CREATE_FAILED);
        }
    }
    async _findOne(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException(specific_msg_1.USERSOCIETYMAP.ERRORS.INVALID_ID);
        }
        try {
            const mapped = await this.sqlRepo.findOne({ where: { id } });
            if (!mapped) {
                throw new common_1.NotFoundException(specific_msg_1.USERSOCIETYMAP.ERRORS.MAP_NOT_FOUND);
            }
            let data = (0, user_society_response_mapper_1.userSocietyResponseMapper)(mapped);
            return { ...data, message: specific_msg_1.USERSOCIETYMAP.SUCCESS.USERMAP_FETCHED };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: id,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERSOCIETYMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _findSql(body) {
        const { userId, societyId } = body;
        if (!userId && !societyId) {
            throw new common_1.BadRequestException('Either userId or societyId is required');
        }
        if (userId && !(0, class_validator_1.isUUID)(userId)) {
            throw new common_1.BadRequestException(specific_msg_1.USERSOCIETYMAP.ERRORS.INVALID_ID);
        }
        if (societyId && !(0, class_validator_1.isUUID)(societyId)) {
            throw new common_1.BadRequestException(specific_msg_1.USERSOCIETYMAP.ERRORS.INVALID_ID);
        }
        try {
            let condition = '';
            const params = [];
            if (userId) {
                condition = 'usm.user_id = $1';
                params.push(userId);
            }
            else {
                condition = 'usm.society_id = $1';
                params.push(societyId);
            }
            const query = `
            SELECT 
                usm.id,
                usm.user_id AS "userId",
                u.name AS "userName",
                u.mobile AS "mobileNumber",
                u.email AS "emailId",
                usm.society_id AS "societyId",
                ssd.society_name AS "societyName",
                ssd.society_type AS "societyType",
                ssd.establishment_year AS "establistmentYear",
                usm.user_role AS "userRole",
                usm.is_active AS "isActive"
            FROM society_management.user_society_map usm
            LEFT JOIN identity.users u
                ON u.id = usm.user_id
            LEFT JOIN society_management.society_setup_details ssd
                ON ssd.society_id = usm.society_id
            WHERE ${condition}
              AND usm.is_active = true
        `;
            const result = await this.sqlRepo.query(query, params);
            if (!result.length) {
                throw new common_1.NotFoundException(specific_msg_1.USERSOCIETYMAP.ERRORS.MAP_NOT_FOUND);
            }
            return {
                ...result[0],
                message: specific_msg_1.USERSOCIETYMAP.SUCCESS.USERMAP_FETCHED
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: body,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERSOCIETYMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _findAllSql() {
        try {
            const query = `
      SELECT 
          usm.id,
          usm.user_role AS "userRole",
          usm.user_id AS "userId",
          u.name AS "userName",
          u.mobile AS "mobileNumber",
          u.email AS "emailId",
          usm.society_id AS "societyId",
          ssd.society_name AS "societyName",
          ssd.society_type AS "societyType",
          ssd.establishment_year AS "establishmentYear",
          usm.is_active AS "isActive"
      FROM society_management.user_society_map usm
      LEFT JOIN identity.users u
          ON u.id = usm.user_id
      LEFT JOIN society_management.society_setup_details ssd
          ON ssd.society_id = usm.society_id
      WHERE usm.is_active = true
    `;
            const result = await this.sqlRepo.query(query);
            if (!result.length) {
                throw new common_1.NotFoundException(specific_msg_1.USERSOCIETYMAP.ERRORS.MAP_NOT_FOUND);
            }
            return {
                data: (0, user_society_getAll_response_1.userSocietyAllResponseMapper)(result),
                message: specific_msg_1.USERSOCIETYMAP.SUCCESS.USERMAP_FETCHED
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: 'fetch-all-user-society-map',
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERSOCIETYMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _updateSql(id, data, req) {
        try {
            delete data.createdBy;
            delete data.createdAt;
            const mappedEntity = (0, user_society_request_mapper_1.userSocietyReqMapper)(data);
            const isPresent = await this._findOne(id);
            if (!isPresent) {
                throw new common_1.NotFoundException(specific_msg_1.USERSOCIETYMAP.ERRORS.MAP_NOT_FOUND);
            }
            const result = await this.sqlRepo.update(id, { ...mappedEntity, updated_by: req.user.userId });
            const updatedData = await this._findOne(id);
            return { ...updatedData, success: true, message: specific_msg_1.USERSOCIETYMAP.SUCCESS.USERMAP_UPDATED };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: id, data,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERSOCIETYMAP.ERRORS.UPDATE_FAILED);
        }
    }
    async _removeSql(id) {
        try {
            await this._findOne(id);
            await this.sqlRepo.update({ id }, { is_active: false });
            return { message: specific_msg_1.USERSOCIETYMAP.SUCCESS.USERMAP_DELETED };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: id,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERSOCIETYMAP.ERRORS.DELETE_FAILED);
        }
    }
};
exports.UserSocietyMapService = UserSocietyMapService;
exports.UserSocietyMapService = UserSocietyMapService = UserSocietyMapService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_society_map_entities_1.UserSocietyMapEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserSocietyMapService);
//# sourceMappingURL=user-society-map.service.js.map