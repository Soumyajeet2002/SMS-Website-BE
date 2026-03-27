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
var CategoryAmenityMapService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryAmenityMapService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_amenity_map_entities_1 = require("./entities/category-amenity-map.entities");
const category_amenity_map_request_1 = require("./mappers/category-amenity-map.request");
const typeorm_2 = require("typeorm");
const specific_msg_1 = require("../common/messages/specific.msg");
const category_amenity_map_response_1 = require("./mappers/category-amenity-map.response");
const class_validator_1 = require("class-validator");
const category_amenity_getall_response_mapper_1 = require("./mappers/category-amenity-getall.response.mapper");
const bulk_upsert_util_1 = require("../common/utils/bulk-upsert.util");
let CategoryAmenityMapService = CategoryAmenityMapService_1 = class CategoryAmenityMapService {
    sqlRepo;
    logger = new common_1.Logger(CategoryAmenityMapService_1.name);
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    executeByAction(fnName, ...args) {
        const methodMap = {
            'create': this._createSql.bind(this),
            'find': this._findSql.bind(this),
            'update': this._updateSql.bind(this)
        };
        const method = methodMap[fnName];
        if (!method)
            throw new Error(`Invalid function: ${fnName}`);
        return method(...args);
    }
    async _createSql(data, req) {
        try {
            const { categoryCode, amenityDetails } = data;
            if (!categoryCode || !amenityDetails?.length) {
                throw new common_1.BadRequestException(specific_msg_1.CATGAMENITYMAP.ERRORS.REQUIRED);
            }
            const values = amenityDetails.map((item) => {
                const mapped = (0, category_amenity_map_request_1.categoryAmenityRequestMapper)(categoryCode, item);
                return {
                    ...mapped,
                    created_by: req.user.userId,
                    updated_by: req.user.userId,
                    updated_at: new Date(),
                };
            });
            await (0, bulk_upsert_util_1.bulkUpsert)(this.sqlRepo, values, ['display_order', 'status', 'metadata', 'updated_by', 'updated_at'], ['category_code', 'amenity_id']);
            return { message: specific_msg_1.CATGAMENITYMAP.SUCCESS.CATGMAP_CREATED };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.CATGAMENITYMAP.ERRORS.CREATE_FAILED);
        }
    }
    async _findSql(catgCode) {
        try {
            let query = `
            SELECT
            cam.id,
            cam.category_code,
            cam.display_order,
            cam.status AS mapping_status,
            cam.created_by,
            cam.created_at,
            cam.updated_by,
            cam.updated_at,
            
            gm.name AS gencode_name,
            
            am.amenity_code,
            am.amenity_name,
            am.description,
            am.icon_url,
            am.is_chargeable,
            am.status AS amenity_status,
            am.metadata AS amenity_metadata

            FROM society_management.category_amenity_map AS cam

            JOIN society_master.gencode_master AS gm
                ON gm.group_code = 'AMENITY_CATEGORY'
                AND gm.gen_code = cam.category_code

            JOIN society_master.amenities_master AS am
                ON am.amenity_id = cam.amenity_id
        `;
            const params = [];
            query += ` WHERE cam.status != 2`;
            if (catgCode) {
                params.push(catgCode);
                query += ` AND cam.category_code = $1`;
            }
            const data = await this.sqlRepo.query(query, params);
            const mappedData = (0, category_amenity_getall_response_mapper_1.categoryAmenityMapAllResponseMapper)(data);
            return {
                message: specific_msg_1.CATGAMENITYMAP.SUCCESS.CATGMAP_FETCHED,
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
                payload: catgCode,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.CATGAMENITYMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _findOneSql(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException(specific_msg_1.CATGAMENITYMAP.ERRORS.INVALID_ID);
        }
        try {
            const foundData = await this.sqlRepo.findOne({ where: { id } });
            if (!foundData) {
                throw new common_1.NotFoundException(specific_msg_1.CATGAMENITYMAP.ERRORS.MAP_NOT_FOUND);
            }
            const data = (0, category_amenity_map_response_1.categoryAmenityResponseMapper)(foundData);
            return { ...data, message: specific_msg_1.CATGAMENITYMAP.SUCCESS.CATGMAP_FETCHED };
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
            throw new common_1.InternalServerErrorException(specific_msg_1.CATGAMENITYMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _updateSql(data, req) {
        try {
            const { categoryCode, amenityDetails } = data;
            const userId = req.user.userId;
            if (!categoryCode || !amenityDetails?.length) {
                throw new common_1.BadRequestException(specific_msg_1.CATGAMENITYMAP.ERRORS.REQUIRED);
            }
            let totalUpdated = 0;
            for (const amenity of amenityDetails) {
                const result = await this.sqlRepo.update({
                    category_code: categoryCode,
                    amenity_id: amenity.amenityId,
                }, {
                    display_order: amenity.displayOrder,
                    status: amenity.status,
                    metadata: amenity.metadata,
                    updated_by: userId,
                });
                totalUpdated += result.affected ?? 0;
            }
            if (totalUpdated === 0) {
                throw new common_1.BadRequestException(specific_msg_1.CATGAMENITYMAP.ERRORS.MAP_NOT_FOUND);
            }
            return {
                message: specific_msg_1.CATGAMENITYMAP.SUCCESS.CATGMAP_UPDATED,
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
            throw new common_1.InternalServerErrorException(specific_msg_1.CATGAMENITYMAP.ERRORS.UPDATE_FAILED);
        }
    }
};
exports.CategoryAmenityMapService = CategoryAmenityMapService;
exports.CategoryAmenityMapService = CategoryAmenityMapService = CategoryAmenityMapService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_amenity_map_entities_1.CategoryAmenityMapEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryAmenityMapService);
//# sourceMappingURL=category-amenity-map.service.js.map