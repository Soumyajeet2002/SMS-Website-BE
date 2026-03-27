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
var FlatServiceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatServiceService = void 0;
const common_1 = require("@nestjs/common");
const society_flat_listing_request_mapper_1 = require("./mappers/society-flat-listing-request.mapper");
const typeorm_1 = require("@nestjs/typeorm");
const society_flat_listing_entity_1 = require("./entities/society-flat-listing.entity");
const typeorm_2 = require("typeorm");
const flat_listings_response_mapper_1 = require("./mappers/flat-listings.response.mapper");
const specific_msg_1 = require("../common/messages/specific.msg");
const media_service_1 = require("../media/media.service");
const media_entity_1 = require("../media/entities/media.entity");
let FlatServiceService = FlatServiceService_1 = class FlatServiceService {
    dataSource;
    mediaService;
    sqlRepo;
    logger = new common_1.Logger(FlatServiceService_1.name);
    constructor(dataSource, mediaService, sqlRepo) {
        this.dataSource = dataSource;
        this.mediaService = mediaService;
        this.sqlRepo = sqlRepo;
    }
    async executeByDBType(fn, ...args) {
        const methodMap = {
            create: this._createSql.bind(this),
            getAll: this._getAllSql.bind(this),
            update: this._updateSql.bind(this),
        };
        const method = methodMap[fn];
        if (!method) {
            this.logger.error(`Invalid function call: ${fn}`);
            throw new common_1.InternalServerErrorException('Invalid operation');
        }
        return method(...args);
    }
    async _createSql(data, req) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const mappedData = (0, society_flat_listing_request_mapper_1.societyFlatListingRequestMapper)({ ...data });
            const flatValue = { ...mappedData, member_id: req.user.userId, created_by: req.user.userId };
            const flat = queryRunner.manager.create(society_flat_listing_entity_1.societyFlatListingEntity, flatValue);
            await queryRunner.manager.save(flat);
            if (data.media && data.media.length > 0) {
                for (const mediaItem of data.media) {
                    await this.mediaService.executeByDBType('create', { ...mediaItem, entityId: flat.id, societyId: flat.society_id, entityType: 'flat_listing', }, req, queryRunner.manager);
                }
            }
            await queryRunner.commitTransaction();
            return { message: 'Flat listing created successfully' };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });
            throw new common_1.InternalServerErrorException('Failed to create flat listing');
        }
        finally {
            await queryRunner.release();
        }
    }
    async _getAllSql(query) {
        try {
            const hasQuery = query.societyId ||
                query.memberId ||
                query.flatType ||
                query.furnishingType ||
                query.pincode ||
                query.page ||
                query.limit ||
                query.sortBy ||
                query.sortOrder;
            const qb = this.sqlRepo
                .createQueryBuilder('flat')
                .leftJoinAndMapMany('flat.media', media_entity_1.mediaEntity, 'media', `
                    media.entity_id = flat.id
                    AND media.entity_type = :entityType
                    AND media.society_id = flat.society_id
                    AND media.status = 1
                    AND media.deleted_at IS NULL
                    `, { entityType: 'flat_listing' })
                .where('flat.deleted_at IS NULL');
            if (query.societyId) {
                qb.andWhere('flat.society_id = :societyId', {
                    societyId: query.societyId,
                });
            }
            if (query.memberId) {
                qb.andWhere('flat.member_id = :memberId', {
                    memberId: query.memberId,
                });
            }
            if (query.flatType) {
                qb.andWhere('flat.flat_type ILIKE :flatType', {
                    flatType: `%${query.flatType}%`,
                });
            }
            if (query.furnishingType) {
                qb.andWhere('flat.furnishing_type ILIKE :furnishingType', {
                    furnishingType: `%${query.furnishingType}%`,
                });
            }
            if (query.pincode) {
                qb.andWhere('flat.pincode = :pincode', {
                    pincode: query.pincode,
                });
            }
            if (!hasQuery) {
                const data = await qb
                    .orderBy('flat.created_at', 'DESC')
                    .getMany();
                return {
                    message: 'Flat listings fetched successfully',
                    page: null,
                    limit: null,
                    total: data.length,
                    totalPages: 1,
                    data: (0, flat_listings_response_mapper_1.flatListingResponseMapper)(data)
                };
            }
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const allowedSortFields = [
                'created_at',
                'rent_amount',
                'available_from',
            ];
            const sortBy = allowedSortFields.includes(query.sortBy)
                ? query.sortBy
                : 'created_at';
            const sortOrder = query.sortOrder === 'ASC' ? 'ASC' : 'DESC';
            const skip = (page - 1) * limit;
            qb.orderBy(`flat.${sortBy}`, sortOrder)
                .skip(skip)
                .take(limit);
            const [data, total] = await qb.getManyAndCount();
            console.log("data--------------->", data);
            return {
                message: 'Flat listings fetched successfully',
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: (0, flat_listings_response_mapper_1.flatListingResponseMapper)(data)
            };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: query,
            });
            throw new common_1.InternalServerErrorException('Failed to fetch flat listings');
        }
    }
    async _updateSql(data, req) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { id, media, ...updateData } = data;
            if (!id) {
                throw new common_1.BadRequestException(specific_msg_1.FLAT.ERRORS.REQUIRED);
            }
            const existing = await queryRunner.manager.findOne(society_flat_listing_entity_1.societyFlatListingEntity, { where: { id } });
            if (!existing) {
                throw new common_1.BadRequestException(specific_msg_1.FLAT.ERRORS.FLAT_NOT_FOUND);
            }
            delete updateData.createdAt;
            delete updateData.createdBy;
            const mappedData = (0, society_flat_listing_request_mapper_1.societyFlatListingRequestMapper)(updateData);
            const cleanedData = Object.fromEntries(Object.entries(mappedData).filter(([_, v]) => v !== undefined));
            await queryRunner.manager.update(society_flat_listing_entity_1.societyFlatListingEntity, { id }, {
                ...cleanedData,
                updated_at: new Date(),
                member_id: req.user.userId
            });
            if (media) {
                const mediaRepo = queryRunner.manager.getRepository(media_entity_1.mediaEntity);
                const dbMedia = await mediaRepo.find({
                    where: {
                        entity_id: id,
                        entity_type: 'flat_listing',
                        society_id: existing.society_id
                    }
                });
                const requestMediaIds = media
                    .filter((m) => m.id)
                    .map((m) => m.id);
                for (const mediaItem of media) {
                    if (mediaItem.id) {
                        await this.mediaService._updateSql(mediaItem, req, queryRunner.manager);
                    }
                    else {
                        await this.mediaService._createSql({
                            ...mediaItem,
                            entityId: id,
                            entityType: 'flat_listing',
                            societyId: existing.society_id
                        }, req, queryRunner.manager);
                    }
                }
                for (const dbItem of dbMedia) {
                    if (!requestMediaIds.includes(dbItem.id)) {
                        await mediaRepo.update({ id: dbItem.id }, {
                            status: 2,
                            deleted_at: new Date()
                        });
                    }
                }
            }
            await queryRunner.commitTransaction();
            const updated = await queryRunner.manager.findOne(society_flat_listing_entity_1.societyFlatListingEntity, { where: { id } });
            return {
                message: specific_msg_1.FLAT.SUCCESS.FLAT_UPDATED
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.FLAT.ERRORS.UPDATE_FAILED);
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.FlatServiceService = FlatServiceService;
exports.FlatServiceService = FlatServiceService = FlatServiceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __param(2, (0, typeorm_1.InjectRepository)(society_flat_listing_entity_1.societyFlatListingEntity)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        media_service_1.MediaService,
        typeorm_2.Repository])
], FlatServiceService);
//# sourceMappingURL=flat-service.service.js.map