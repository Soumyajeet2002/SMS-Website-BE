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
var SecurityGuardsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityGuardsService = void 0;
const common_1 = require("@nestjs/common");
const security_guards_entities_1 = require("./entities/security-guards.entities");
const society_details_entity_1 = require("../society-details/entities/society-details.entity");
const security_guards_response_mapper_1 = require("./mapper/security-guards-response.mapper");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const specific_msg_1 = require("../common/messages/specific.msg");
const security_guards_request_mapper_1 = require("./mapper/security-guards.request.mapper");
let SecurityGuardsService = SecurityGuardsService_1 = class SecurityGuardsService {
    sqlRepo;
    societyRepo;
    logger = new common_1.Logger(SecurityGuardsService_1.name);
    constructor(sqlRepo, societyRepo) {
        this.sqlRepo = sqlRepo;
        this.societyRepo = societyRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createSql.bind(this),
            findAll: this._findAllSql.bind(this),
        };
        const method = methodMap[fn];
        if (!method)
            throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }
    async _createSql(data, req) {
        const societyId = req.user.societyId;
        const society = await this.societyRepo.findOne({
            where: { societyId: societyId },
        });
        if (!society) {
            throw new Error('Society not found');
        }
        const employeeCode = this.generateEmployeeCode(society.societyCode);
        const mappedEntity = (0, security_guards_request_mapper_1.securityGuardsReqMapper)(data);
        try {
            const entity = this.sqlRepo.create({
                ...mappedEntity,
                employeeCode,
                createdBy: req.user.userId,
            });
            await this.sqlRepo.save(entity);
            return { message: specific_msg_1.SECURITYGUARDS.SUCCESS.SECURITY_GUARDS_CREATED };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.SECURITYGUARDS.ERRORS.CREATE_FAILED);
        }
    }
    async _findAllSql(query) {
        try {
            const hasQuery = query.search ||
                query.page ||
                query.limit ||
                query.sortBy ||
                query.sortOrder;
            const queryBuilder = this.sqlRepo.createQueryBuilder('sg');
            queryBuilder.where('sg.status != :deletedStatus', {
                deletedStatus: 2,
            });
            if (query.search) {
                queryBuilder.andWhere(`(sg.employee_code ILIKE :s OR sg.designation ILIKE :s OR sg.id_number ILIKE :s)`, { s: `%${query.search}%` });
            }
            if (!hasQuery) {
                const data = await queryBuilder.getMany();
                const finalData = data.map(security_guards_response_mapper_1.securityGuardsResponseMapper);
                return {
                    page: null,
                    limit: null,
                    total: data.length,
                    totalPages: 1,
                    data: finalData,
                    message: specific_msg_1.SECURITYGUARDS.SUCCESS.SECURITY_GUARDS_FETCHED,
                };
            }
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const sortBy = query.sortBy || 'created_at';
            const sortOrder = (query.sortOrder || 'DESC');
            const skip = (page - 1) * limit;
            queryBuilder
                .orderBy(`sg.${sortBy}`, sortOrder)
                .skip(skip)
                .take(limit);
            const [data, total] = await queryBuilder.getManyAndCount();
            const finalData = data.map(security_guards_response_mapper_1.securityGuardsResponseMapper);
            return {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: finalData,
                message: specific_msg_1.SECURITYGUARDS.SUCCESS.SECURITY_GUARDS_FETCHED,
            };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: query,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.SECURITYGUARDS.ERRORS.FETCH_FAILED);
        }
    }
    generateEmployeeCode(societyCode) {
        const companyCode = 'PTPL';
        const year = new Date().getFullYear();
        const random = Math.floor(1000 + Math.random() * 9000);
        return `${companyCode}-${societyCode}-${year}-${random}`;
    }
};
exports.SecurityGuardsService = SecurityGuardsService;
exports.SecurityGuardsService = SecurityGuardsService = SecurityGuardsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(security_guards_entities_1.SecurityGuardsEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(society_details_entity_1.SocietySetupDetailsEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], SecurityGuardsService);
//# sourceMappingURL=security-guards.service.js.map