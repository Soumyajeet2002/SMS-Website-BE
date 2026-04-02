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
var ResidentDetailsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResidentDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const resident_details_entities_1 = require("./entities/resident-details.entities");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("@nestjs/typeorm");
const specific_msg_1 = require("../common/messages/specific.msg");
const resident_details_request_mapper_1 = require("./mapper/resident-details.request.mapper");
const resident_details_response_mapper_1 = require("./mapper/resident-details.response.mapper");
const class_validator_1 = require("class-validator");
let ResidentDetailsService = ResidentDetailsService_1 = class ResidentDetailsService {
    sqlRepo;
    dataSource;
    logger = new common_1.Logger(ResidentDetailsService_1.name);
    constructor(sqlRepo, dataSource) {
        this.sqlRepo = sqlRepo;
        this.dataSource = dataSource;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createSql.bind(this),
            update: this._updateSql.bind(this),
            getById: this._getByIdSql.bind(this),
            getAll: this._getAll.bind(this)
        };
        const method = methodMap[fn];
        if (!method)
            throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }
    async _createSql(data, req) {
        try {
            const [seq] = await this.dataSource?.query(`
            SELECT 
                society_management.get_society_block_sequence($1, '', 'societySeq') AS society_seq,
                society_management.get_society_block_sequence($1, $2, 'blockSeq') AS block_seq,
                society_management.get_society_block_sequence('', $2, 'residentSeq') AS resident_seq`, [
                data.societyId,
                data.blockId,
            ]);
            const memberId = `${new Date().getFullYear()}-${seq.society_seq}-${seq.block_seq}-${seq.resident_seq}`;
            const mappedEntity = (0, resident_details_request_mapper_1.residentDetailsReqMapper)(data);
            const entity = this.sqlRepo.create({
                ...mappedEntity,
                member_id: memberId,
                created_by: req.user.userId
            });
            await this.sqlRepo.save(entity);
            return { message: specific_msg_1.USERRESIDENTMAP.SUCCESS.RESIDENT_CREATED };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERRESIDENTMAP.ERRORS.CREATE_FAILED);
        }
    }
    async _updateSql(data, req) {
        delete data.createdBy;
        delete data.createdAt;
        const residentId = data.residentId;
        const mappedEntity = (0, resident_details_request_mapper_1.residentDetailsReqMapper)(data);
        const isPresent = await this._findOne(residentId);
        if (!isPresent) {
            throw new common_1.NotFoundException(specific_msg_1.USERRESIDENTMAP.ERRORS.RESIDENT_NOT_FOUND);
        }
        const result = await this.sqlRepo.update({ resident_uuid: residentId }, { ...mappedEntity, updated_by: req.user.userId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(specific_msg_1.USERRESIDENTMAP.ERRORS.RESIDENT_NOT_FOUND);
        }
        const updatedData = await this._getByIdSql(residentId);
        return { ...updatedData, message: specific_msg_1.USERRESIDENTMAP.SUCCESS.RESIDENT_UPDATED };
    }
    async _getByIdSql(residentId) {
        if (!residentId) {
            throw new common_1.BadRequestException('Resident id is required');
        }
        try {
            const result = await this.dataSource.query(`
                SELECT 
                    rd.resident_uuid,
                    rd.member_id,
                    rd.block_id,
                    rd.flat_number,
                    rd.owner_type,
                    rd.move_in_date,
                    rd.emergency_contact,
                    rd.id_proof_type,
                    rd.id_proof_doc,
                    rd.profile_pic,
                    rsm.id,
                    rsm.society_id,
                    u.mobile,
                    u.name,
                    u.email,
                    u.status
                FROM society_management.resident_details rd
                LEFT JOIN society_management.user_society_map rsm 
                    ON rd.resident_uuid = rsm.user_id
                LEFT JOIN identity.users u 
                    ON u.id = rsm.user_id
                WHERE rd.resident_uuid = $1
            `, [residentId]);
            const data = (0, resident_details_response_mapper_1.residentDetailsResMapper)(result[0]);
            return {
                ...data,
                message: specific_msg_1.USERRESIDENTMAP.SUCCESS.RESIDENT_FETCHED,
            };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERRESIDENTMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _getAll(query) {
        try {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const skip = (page - 1) * limit;
            const search = query.search || '';
            const ownerType = query.ownerType;
            const status = query.status;
            let conditions = [];
            let values = [];
            let index = 1;
            if (search) {
                conditions.push(`(
                u.name ILIKE $${index} OR
                u.mobile ILIKE $${index} OR
                u.email ILIKE $${index}
            )`);
                values.push(`%${search}%`);
                index++;
            }
            if (ownerType) {
                conditions.push(`rd.owner_type = $${index}`);
                values.push(ownerType);
                index++;
            }
            if (status) {
                conditions.push(`u.status = $${index}`);
                values.push(status);
                index++;
            }
            const whereClause = conditions.length
                ? `WHERE ${conditions.join(' AND ')}`
                : '';
            const result = await this.dataSource.query(`
            SELECT 
                rd.resident_uuid,
                rd.member_id,
                rd.block_id,
                rd.flat_number,
                rd.owner_type,
                rd.move_in_date,
                rd.emergency_contact,
                rd.id_proof_type,
                rd.id_proof_doc,
                rd.profile_pic,
                rsm.id,
                rsm.society_id,
                u.mobile,
                u.name,
                u.email,
                u.status
            FROM society_management.resident_details rd
            LEFT JOIN society_management.user_society_map rsm 
                ON rd.resident_uuid = rsm.user_id
            LEFT JOIN identity.users u 
                ON u.id = rsm.user_id
            ${whereClause}
            ORDER BY rd.created_at DESC
            LIMIT $${index} OFFSET $${index + 1}
            `, [...values, limit, skip]);
            const countResult = await this.dataSource.query(`
            SELECT COUNT(*) AS total
            FROM society_management.resident_details rd
            LEFT JOIN society_management.user_society_map rsm 
                ON rd.resident_uuid = rsm.user_id
            LEFT JOIN identity.users u 
                ON u.id = rsm.user_id
            ${whereClause}
            `, values);
            const total = Number(countResult[0]?.total || 0);
            const data = result.map(resident_details_response_mapper_1.residentDetailsResMapper);
            return {
                data,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                message: specific_msg_1.USERRESIDENTMAP.SUCCESS.RESIDENT_FETCHED,
            };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERRESIDENTMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _findOne(residentId) {
        if (!(0, class_validator_1.isUUID)(residentId)) {
            throw new common_1.BadRequestException(specific_msg_1.USERRESIDENTMAP.ERRORS.INVALID_ID);
        }
        try {
            const residentDetails = await this.sqlRepo.findOne({ where: { resident_uuid: residentId } });
            if (!residentDetails) {
                throw new common_1.NotFoundException(specific_msg_1.USERRESIDENTMAP.ERRORS.RESIDENT_NOT_FOUND);
            }
            return { residentDetails, message: specific_msg_1.USERRESIDENTMAP.SUCCESS.RESIDENT_FETCHED };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: residentId,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERRESIDENTMAP.ERRORS.FETCH_FAILED);
        }
    }
};
exports.ResidentDetailsService = ResidentDetailsService;
exports.ResidentDetailsService = ResidentDetailsService = ResidentDetailsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_3.InjectRepository)(resident_details_entities_1.ResidentDetails)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_1.DataSource])
], ResidentDetailsService);
//# sourceMappingURL=resident-details.service.js.map