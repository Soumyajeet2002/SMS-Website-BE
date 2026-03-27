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
var SocietyDetailsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const specific_msg_1 = require("../common/messages/specific.msg");
const society_details_entity_1 = require("./entities/society-details.entity");
const society_details_response_mapper_1 = require("./mappers/society-details.response.mapper");
const society_audit_service_1 = require("../audit/society-audit.service");
const common_constant_1 = require("../common/constants/common.constant");
const society_block_entity_1 = require("./entities/society-block.entity");
const user_society_map_entities_1 = require("../user-society-map/entities/user-society-map.entities");
const users_entity_1 = require("./entities/users.entity");
let SocietyDetailsService = SocietyDetailsService_1 = class SocietyDetailsService {
    societyAuditService;
    sqlRepo;
    blockRepo;
    dataSource;
    logger = new common_1.Logger(SocietyDetailsService_1.name);
    constructor(societyAuditService, sqlRepo, blockRepo, dataSource) {
        this.societyAuditService = societyAuditService;
        this.sqlRepo = sqlRepo;
        this.blockRepo = blockRepo;
        this.dataSource = dataSource;
    }
    async executeByDBType(fn, ...args) {
        const methodMap = {
            create: this._createSql.bind(this),
            update: this._updateSql.bind(this),
            getAll: this._getAllSql.bind(this),
            getById: this._getByIdSql.bind(this),
        };
        const method = methodMap[fn];
        if (!method) {
            this.logger.error(`Invalid function call: ${fn}`);
            throw new common_1.InternalServerErrorException('Invalid operation');
        }
        return method(...args);
    }
    async _getByIdSql(societyId) {
        try {
            const entity = await this.sqlRepo
                .createQueryBuilder('s')
                .leftJoinAndSelect('s.blocks', 'b', 'b.isDeleted = false AND b.status = 1')
                .leftJoinAndMapMany('s.admins', user_society_map_entities_1.UserSocietyMapEntity, 'a', 'a.society_id = s.societyId AND a.is_active = true')
                .leftJoinAndMapOne('a.user', users_entity_1.UsersEntity, 'u', 'u.id = a.user_id')
                .where('s.societyId = :societyId', { societyId })
                .andWhere('s.isDeleted = false')
                .andWhere('s.status != 2')
                .getOne();
            if (!entity) {
                throw new common_1.NotFoundException(specific_msg_1.SOCIETY.ERRORS.SOCIETY_NOT_FOUND);
            }
            const data = (0, society_details_response_mapper_1.societyDetailsResponseMapper)(entity);
            return {
                ...data,
                message: specific_msg_1.SOCIETY.SUCCESS.SOCIETY_FETCHED,
            };
        }
        catch (err) {
            this.logger.error(`Fetch society failed | societyId=${societyId}`, err.stack);
            if (err instanceof common_1.NotFoundException)
                throw err;
            throw new common_1.InternalServerErrorException(specific_msg_1.SOCIETY.ERRORS.FETCH_ONE_FAILED);
        }
    }
    async _getAllSql(query) {
        console.log('testi99999');
        try {
            const hasQuery = query.search ||
                query.page ||
                query.limit ||
                query.sortBy ||
                query.sortOrder;
            const qb = this.sqlRepo
                .createQueryBuilder('s')
                .leftJoinAndSelect('s.blocks', 'b')
                .leftJoinAndMapMany('s.admins', user_society_map_entities_1.UserSocietyMapEntity, 'a', 'a.society_id = s.societyId AND a.is_active = true')
                .leftJoinAndMapOne('a.user', users_entity_1.UsersEntity, 'u', 'u.id = a.user_id')
                .where('s.isDeleted = false')
                .andWhere('s.status != 2')
                .andWhere('(b.status = 1 OR b.status IS NULL)');
            if (query.search) {
                qb.andWhere(`(s.societyName ILIKE :search
          OR s.societyCode ILIKE :search
          OR s.city ILIKE :search
          OR s.registrationNumber ILIKE :search)`, { search: `%${query.search}%` });
            }
            if (query.societyLevel) {
                qb.andWhere('s.societyLevelCode = :societyLevelCode', {
                    societyLevelCode: query.societyLevel,
                });
            }
            if (query.status !== undefined) {
                qb.andWhere('s.status = :status', {
                    status: Number(query.status),
                });
            }
            if (!hasQuery) {
                const data = await qb.orderBy('s.createdAt', 'DESC').getMany();
                return {
                    page: null,
                    limit: null,
                    total: data.length,
                    totalPages: 1,
                    message: specific_msg_1.SOCIETY.SUCCESS.SOCIETY_FETCHED,
                    data: data.map(society_details_response_mapper_1.societyDetailsResponseMapper),
                };
            }
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const skip = (page - 1) * limit;
            const allowedSortFields = [
                'createdAt',
                'societyName',
                'societyCode',
                'city',
                'status',
            ];
            const sortBy = query.sortBy && allowedSortFields.includes(query.sortBy)
                ? query.sortBy
                : 'createdAt';
            const sortOrder = query.sortOrder || 'DESC';
            qb.orderBy(`s.${sortBy}`, sortOrder).skip(skip).take(limit);
            const [data, total] = await qb.getManyAndCount();
            return {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                message: specific_msg_1.SOCIETY.SUCCESS.SOCIETY_FETCHED,
                data: data.map(society_details_response_mapper_1.societyDetailsResponseMapper),
            };
        }
        catch (error) {
            this.logger.error({
                message: 'Fetch societies failed',
                error: error.message,
                stack: error.stack,
                payload: query,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.SOCIETY.ERRORS.FETCH_FAILED);
        }
    }
    async _createSql(dto, req) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const userId = req?.user?.userId || 'a13a8a2b-3228-49d6-ad89-2b464c68c110';
            const { blocks, adminDetails, ...societyFields } = dto;
            const societyEntity = queryRunner.manager.create(society_details_entity_1.SocietySetupDetailsEntity, {
                ...societyFields,
                createdBy: userId,
            });
            const savedSociety = await queryRunner.manager.save(society_details_entity_1.SocietySetupDetailsEntity, societyEntity);
            let savedBlocks = [];
            if (blocks?.length) {
                const blockEntities = blocks.map((block) => queryRunner.manager.create(society_block_entity_1.SocietyBlockEntity, {
                    societyId: savedSociety.societyId,
                    blockName: block.blockName,
                    blockCode: `${block.blockName
                        ?.trim()
                        .toUpperCase()
                        .replace(/\s+/g, '')}-${Math.random()
                        .toString(36)
                        .substring(2, 6)}`,
                    totalFloors: block.numberOfFloors ?? 0,
                    totalFlats: block.totalFlats ?? 0,
                    parkingSlot: block.parkingSlots ?? 0,
                    blockType: block.blockType || null,
                    status: 1,
                    createdBy: userId,
                }));
                savedBlocks = await queryRunner.manager.save(society_block_entity_1.SocietyBlockEntity, blockEntities);
            }
            let savedAdmins = [];
            if (adminDetails?.length) {
                const adminEntities = adminDetails.map((admin) => queryRunner.manager.create(user_society_map_entities_1.UserSocietyMapEntity, {
                    user_id: admin.userId,
                    society_id: savedSociety.societyId,
                    user_role: admin.roleName,
                    created_by: userId,
                    is_active: true,
                }));
                savedAdmins = await queryRunner.manager.save(user_society_map_entities_1.UserSocietyMapEntity, adminEntities);
            }
            await queryRunner.commitTransaction();
            await this._auditSociety({
                tableName: queryRunner.manager.getRepository(society_details_entity_1.SocietySetupDetailsEntity)
                    .metadata.tableName,
                action: common_constant_1.HTTP_METHOD.CREATE,
                recordId: savedSociety.societyId,
                newData: savedSociety,
            }, req);
            if (savedBlocks.length) {
                for (const block of savedBlocks) {
                    await this._auditSociety({
                        tableName: queryRunner.manager.getRepository(society_block_entity_1.SocietyBlockEntity)
                            .metadata.tableName,
                        action: common_constant_1.HTTP_METHOD.CREATE,
                        recordId: block.blockId,
                        newData: block,
                    }, req);
                }
            }
            if (savedAdmins.length) {
                for (const admin of savedAdmins) {
                    await this._auditSociety({
                        tableName: queryRunner.manager.getRepository(user_society_map_entities_1.UserSocietyMapEntity)
                            .metadata.tableName,
                        action: common_constant_1.HTTP_METHOD.CREATE,
                        recordId: admin.id,
                        newData: admin,
                    }, req);
                }
            }
            const data = (0, society_details_response_mapper_1.societyDetailsResponseMapper)(savedSociety);
            return {
                ...data,
                message: specific_msg_1.SOCIETY.SUCCESS.SOCIETY_CREATED,
            };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            this.logger.error('Society creation failed', err.stack);
            if (err?.code === '23505') {
                throw new common_1.BadRequestException('Duplicate society code, registration number, block code or user already mapped');
            }
            throw new common_1.InternalServerErrorException(specific_msg_1.SOCIETY.ERRORS.CREATE_FAILED);
        }
        finally {
            await queryRunner.release();
        }
    }
    async _updateSql(societyId, dto, req) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const userId = req?.user?.userId || 'a13a8a2b-3228-49d6-ad89-2b464c68c110';
            const society = await queryRunner.manager.findOne(society_details_entity_1.SocietySetupDetailsEntity, { where: { societyId, isDeleted: false } });
            if (!society) {
                throw new common_1.NotFoundException(specific_msg_1.SOCIETY.ERRORS.SOCIETY_NOT_FOUND);
            }
            const oldData = JSON.parse(JSON.stringify(society));
            const { blocks, ...societyFields } = dto;
            const filteredFields = Object.fromEntries(Object.entries(societyFields).filter(([_, value]) => value !== undefined));
            Object.assign(society, filteredFields);
            society.updatedBy = userId;
            const savedSociety = await queryRunner.manager.save(society_details_entity_1.SocietySetupDetailsEntity, society);
            const blockAudits = [];
            if (dto.blocks) {
                const existingBlocks = await queryRunner.manager.find(society_block_entity_1.SocietyBlockEntity, { where: { societyId, isDeleted: false } });
                const existingBlockMap = new Map(existingBlocks.map((b) => [b.blockCode, b]));
                const incomingBlockCodes = new Set();
                for (const block of dto.blocks) {
                    const existing = block.blockCode
                        ? existingBlockMap.get(block.blockCode)
                        : undefined;
                    if (existing) {
                        const oldBlockData = JSON.parse(JSON.stringify(existing));
                        const updatePayload = { updatedBy: userId };
                        if (block.blockName !== undefined)
                            updatePayload.blockName = block.blockName;
                        if (block.numberOfFloors !== undefined)
                            updatePayload.totalFloors = block.numberOfFloors;
                        if (block.totalFlats !== undefined)
                            updatePayload.totalFlats = block.totalFlats;
                        if (block.parkingSlots !== undefined)
                            updatePayload.parkingSlot = block.parkingSlots;
                        if (block.blockType !== undefined)
                            updatePayload.blockType = block.blockType;
                        await queryRunner.manager.update(society_block_entity_1.SocietyBlockEntity, { blockId: existing.blockId }, updatePayload);
                        const updatedBlock = {
                            ...existing,
                            ...updatePayload,
                        };
                        blockAudits.push({
                            action: common_constant_1.HTTP_METHOD.UPDATE,
                            recordId: existing.blockId,
                            oldData: oldBlockData,
                            newData: updatedBlock,
                        });
                        incomingBlockCodes.add(block.blockCode);
                    }
                    else {
                        if (!block.blockName) {
                            throw new common_1.BadRequestException('blockName is required for new block');
                        }
                        const newBlock = queryRunner.manager.create(society_block_entity_1.SocietyBlockEntity, {
                            societyId,
                            blockName: block.blockName,
                            blockCode: `${block.blockName
                                .trim()
                                .toUpperCase()
                                .replace(/\s+/g, '')}-${Math.random()
                                .toString(36)
                                .substring(2, 6)}`,
                            totalFloors: block.numberOfFloors ?? 0,
                            totalFlats: block.totalFlats ?? 0,
                            parkingSlot: block.parkingSlots ?? 0,
                            blockType: block.blockType ?? undefined,
                            status: 1,
                            isDeleted: false,
                            createdBy: userId,
                        });
                        const savedBlock = await queryRunner.manager.save(society_block_entity_1.SocietyBlockEntity, newBlock);
                        blockAudits.push({
                            action: common_constant_1.HTTP_METHOD.CREATE,
                            recordId: savedBlock.blockId,
                            oldData: null,
                            newData: savedBlock,
                        });
                        incomingBlockCodes.add(savedBlock.blockCode);
                    }
                }
                for (const existing of existingBlocks) {
                    if (!incomingBlockCodes.has(existing.blockCode)) {
                        const oldBlockData = JSON.parse(JSON.stringify(existing));
                        await queryRunner.manager.update(society_block_entity_1.SocietyBlockEntity, { blockId: existing.blockId }, {
                            isDeleted: true,
                            status: 2,
                            updatedBy: userId,
                        });
                        blockAudits.push({
                            action: common_constant_1.HTTP_METHOD.DELETE,
                            recordId: existing.blockId,
                            oldData: oldBlockData,
                            newData: { ...existing, isDeleted: true, status: 2 },
                        });
                    }
                }
            }
            const adminAudits = [];
            if (dto.adminDetails) {
                const existingAdmins = await queryRunner.manager.find(user_society_map_entities_1.UserSocietyMapEntity, {
                    where: {
                        society_id: societyId,
                    },
                });
                const existingAdminMap = new Map(existingAdmins.map((a) => [a.user_id, a]));
                const incomingUserIds = new Set();
                for (const admin of dto.adminDetails) {
                    const existing = existingAdminMap.get(admin.userId);
                    if (existing) {
                        const oldAdmin = JSON.parse(JSON.stringify(existing));
                        const updatePayload = {
                            user_role: admin.roleName,
                            is_active: true,
                            updated_by: userId,
                        };
                        await queryRunner.manager.update(user_society_map_entities_1.UserSocietyMapEntity, { id: existing.id }, updatePayload);
                        adminAudits.push({
                            action: common_constant_1.HTTP_METHOD.UPDATE,
                            recordId: existing.id,
                            oldData: oldAdmin,
                            newData: { ...existing, ...updatePayload },
                        });
                        incomingUserIds.add(admin.userId);
                    }
                    else {
                        const newAdmin = queryRunner.manager.create(user_society_map_entities_1.UserSocietyMapEntity, {
                            user_id: admin.userId,
                            society_id: societyId,
                            user_role: admin.roleName,
                            created_by: userId,
                            is_active: true,
                        });
                        const savedAdmin = await queryRunner.manager.save(user_society_map_entities_1.UserSocietyMapEntity, newAdmin);
                        adminAudits.push({
                            action: common_constant_1.HTTP_METHOD.CREATE,
                            recordId: savedAdmin.id,
                            oldData: null,
                            newData: savedAdmin,
                        });
                        incomingUserIds.add(savedAdmin.user_id);
                    }
                }
                for (const existing of existingAdmins) {
                    if (!incomingUserIds.has(existing.user_id)) {
                        const oldAdmin = JSON.parse(JSON.stringify(existing));
                        await queryRunner.manager.update(user_society_map_entities_1.UserSocietyMapEntity, { id: existing.id }, {
                            is_active: false,
                            updated_by: userId,
                        });
                        adminAudits.push({
                            action: common_constant_1.HTTP_METHOD.DELETE,
                            recordId: existing.id,
                            oldData: oldAdmin,
                            newData: { ...existing, is_active: false },
                        });
                    }
                }
            }
            await queryRunner.commitTransaction();
            await this._auditSociety({
                tableName: this.sqlRepo.metadata.tableName,
                action: common_constant_1.HTTP_METHOD.UPDATE,
                recordId: societyId,
                oldData,
                newData: savedSociety,
            }, req);
            for (const audit of blockAudits) {
                await this._auditSociety({
                    tableName: 'society_block',
                    action: audit.action,
                    recordId: audit.recordId,
                    oldData: audit.oldData,
                    newData: audit.newData,
                }, req);
            }
            for (const audit of adminAudits) {
                await this._auditSociety({
                    tableName: 'user_society_map',
                    action: audit.action,
                    recordId: audit.recordId,
                    oldData: audit.oldData,
                    newData: audit.newData,
                }, req);
            }
            const data = (0, society_details_response_mapper_1.societyDetailsResponseMapper)(savedSociety);
            return {
                ...data,
                message: specific_msg_1.SOCIETY.SUCCESS.SOCIETY_UPDATED,
            };
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`Society update failed: ${societyId}`, err.stack);
            if (err instanceof common_1.NotFoundException)
                throw err;
            if (err?.code === '23505') {
                throw new common_1.BadRequestException('Duplicate society code, registration number, or block name found');
            }
            throw new common_1.InternalServerErrorException(specific_msg_1.SOCIETY.ERRORS.UPDATE_FAILED);
        }
        finally {
            await queryRunner.release();
        }
    }
    async _auditSociety(params, req) {
        try {
            await this.societyAuditService.auditLog({
                recordId: params.recordId,
                tableName: params.tableName,
                action: params.action,
                oldData: params.oldData ?? null,
                newData: params.newData ?? null,
                changedBy: req?.user?.userId || null,
                ipAddress: req?.ip || null,
                platform: req?.headers['user-agent'] || null,
            });
        }
        catch (auditErr) {
            this.logger.warn(`Society Audit log failed (${params.action})`, auditErr);
        }
    }
};
exports.SocietyDetailsService = SocietyDetailsService;
exports.SocietyDetailsService = SocietyDetailsService = SocietyDetailsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Optional)()),
    __param(1, (0, typeorm_2.InjectRepository)(society_details_entity_1.SocietySetupDetailsEntity)),
    __param(2, (0, typeorm_2.InjectRepository)(society_block_entity_1.SocietyBlockEntity)),
    __metadata("design:paramtypes", [society_audit_service_1.SocietyAuditService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], SocietyDetailsService);
//# sourceMappingURL=society-details.service.js.map