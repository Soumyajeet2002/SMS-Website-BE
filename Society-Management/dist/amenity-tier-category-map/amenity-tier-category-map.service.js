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
var TierCategoryMapService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TierCategoryMapService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const amenity_tier_category_map_entities_1 = require("./entities/amenity-tier-category-map.entities");
const amenity_tier_category_map_request_mapper_1 = require("./mappers/amenity-tier-category-map.request.mapper");
const class_validator_1 = require("class-validator");
const specific_msg_1 = require("../common/messages/specific.msg");
const amenity_tier_category_map_response_1 = require("./mappers/amenity-tier-category-map.response");
const amenity_tier_category_getall_response_mapper_1 = require("./mappers/amenity-tier-category-getall.response.mapper");
const bulk_upsert_util_1 = require("../common/utils/bulk-upsert.util");
let TierCategoryMapService = TierCategoryMapService_1 = class TierCategoryMapService {
    sqlRepo;
    logger = new common_1.Logger(TierCategoryMapService_1.name);
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createSql.bind(this),
            findAll: this._findSql.bind(this),
            findOne: this._findOneSql.bind(this),
            update: this._updateSql.bind(this),
            remove: this._removeSql.bind(this),
        };
        const method = methodMap[fn];
        if (!method)
            throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }
    async _createSql(data, req) {
        try {
            const { tierCode, categoryDetails } = data;
            const values = categoryDetails.map((category) => {
                const mapped = (0, amenity_tier_category_map_request_mapper_1.amenityTierCategoryMapReqMapper)(tierCode, category);
                return {
                    ...mapped,
                    created_by: req.user.userId,
                    updated_by: req.user.userId,
                    updated_at: new Date(),
                };
            });
            await (0, bulk_upsert_util_1.bulkUpsert)(this.sqlRepo, values, ['display_order', 'status', 'updated_by', 'updated_at'], ['tier_code', 'category_code']);
            return {
                message: specific_msg_1.AMENITYTIERCATGMAP.SUCCESS.USERMAP_CREATED,
            };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.AMENITYTIERCATGMAP.ERRORS.CREATE_FAILED);
        }
    }
    async _findSql(tierCode) {
        try {
            let query = `
            SELECT
                atcm.id,
                atcm.tier_code,
                atcm.category_code,
                atcm.display_order,
                atcm.status,
                atcm.created_by,
                atcm.created_at,
                atcm.updated_by,
                atcm.updated_at,

                tier_gc.name     AS tier_name,
                category_gc.name AS category_name

            FROM society_management.amenity_tier_category_map atcm

            LEFT JOIN society_master.gencode_master tier_gc
              ON tier_gc.group_code = 'AMENITY_TIER'
             AND tier_gc.gen_code   = atcm.tier_code

            LEFT JOIN society_master.gencode_master category_gc
              ON category_gc.group_code = 'AMENITY_CATEGORY'
             AND category_gc.gen_code   = atcm.category_code
        `;
            const params = [];
            query += ` WHERE atcm.status != 2 `;
            if (tierCode) {
                params.push(tierCode);
                query += ` AND atcm.tier_code = $1`;
            }
            const result = await this.sqlRepo.query(query, params);
            const mappedData = (0, amenity_tier_category_getall_response_mapper_1.amenityTierCategoryAllResponseMapper)(result);
            return {
                message: "Amenity tier category list fetched successfully",
                data: mappedData
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: tierCode,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.AMENITYTIERCATGMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _findOneSql(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException(specific_msg_1.AMENITYTIERCATGMAP.ERRORS.INVALID_ID);
        }
        try {
            const mapped = await this.sqlRepo.findOne({ where: { id } });
            if (!mapped) {
                throw new common_1.NotFoundException(specific_msg_1.AMENITYTIERCATGMAP.ERRORS.MAP_NOT_FOUND);
            }
            let data = (0, amenity_tier_category_map_response_1.amenityTierCategoryMapResponseMapper)(mapped);
            return { ...data, message: specific_msg_1.AMENITYTIERCATGMAP.SUCCESS.USERMAP_FETCHED };
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
            throw new common_1.InternalServerErrorException(specific_msg_1.AMENITYTIERCATGMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _updateSql(data, req) {
        try {
            const { tierCode, categoryDetails } = data;
            const userId = req.user.userId;
            if (!tierCode || !categoryDetails?.length) {
                throw new common_1.BadRequestException(specific_msg_1.AMENITYTIERCATGMAP.ERRORS.REQUIRED);
            }
            let totalUpdated = 0;
            for (const category of categoryDetails) {
                const result = await this.sqlRepo.update({
                    tier_code: tierCode,
                    category_code: category.categoryCode,
                }, {
                    display_order: category.displayOrder,
                    status: category.status,
                    updated_by: userId,
                });
                totalUpdated += result.affected ?? 0;
            }
            if (totalUpdated === 0) {
                throw new common_1.BadRequestException(specific_msg_1.AMENITYTIERCATGMAP.ERRORS.MAP_NOT_FOUND);
            }
            return {
                message: specific_msg_1.AMENITYTIERCATGMAP.SUCCESS.USERMAP_UPDATED,
                updatedCount: totalUpdated,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: { data },
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.AMENITYTIERCATGMAP.ERRORS.UPDATE_FAILED);
        }
    }
    async _removeSql(id) {
        try {
            await this._findOneSql(id);
            await this.sqlRepo.update({ id }, { status: 2 });
            return { message: specific_msg_1.AMENITYTIERCATGMAP.SUCCESS.USERMAP_DELETED };
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
            throw new common_1.InternalServerErrorException(specific_msg_1.AMENITYTIERCATGMAP.ERRORS.DELETE_FAILED);
        }
    }
};
exports.TierCategoryMapService = TierCategoryMapService;
exports.TierCategoryMapService = TierCategoryMapService = TierCategoryMapService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(amenity_tier_category_map_entities_1.TierCategoryMapEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TierCategoryMapService);
//# sourceMappingURL=amenity-tier-category-map.service.js.map