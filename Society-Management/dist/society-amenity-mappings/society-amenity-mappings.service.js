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
var SocietyAmenityMappingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyAmenityMappingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const society_amenity_map_entities_1 = require("./entities/society-amenity-map.entities");
const typeorm_2 = require("typeorm");
const society_amenity_map_request_mapper_1 = require("./mappers/society-amenity-map.request.mapper");
const bulk_upsert_util_1 = require("../common/utils/bulk-upsert.util");
const specific_msg_1 = require("../common/messages/specific.msg");
const society_amenity_map_getAll_response_mapper_1 = require("./mappers/society-amenity-map.getAll.response.mapper");
let SocietyAmenityMappingsService = SocietyAmenityMappingsService_1 = class SocietyAmenityMappingsService {
    sqlRepo;
    logger = new common_1.Logger(SocietyAmenityMappingsService_1.name);
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    executeByAction(fnName, ...args) {
        const methodMap = {
            'create': this._createSql.bind(this),
            'findById': this._findSql.bind(this)
        };
        const method = methodMap[fnName];
        if (!method)
            throw new Error(`Invalid function: ${fnName}`);
        return method(...args);
    }
    async _createSql(data, req) {
        try {
            const { societyId, amenityDetails } = data;
            if (!societyId || !amenityDetails?.length) {
                throw new common_1.BadRequestException(specific_msg_1.SOCIETYAMENITYMAP.ERRORS.REQUIRED);
            }
            const values = amenityDetails.map((item) => {
                const mapped = (0, society_amenity_map_request_mapper_1.societyAmenityMapRequestMapper)(societyId, item.amenityId, item);
                return {
                    ...mapped,
                    created_by: req.user.userId,
                    updated_by: req.user.userId,
                    updated_at: new Date(),
                };
            });
            const { inserted, updated } = await (0, bulk_upsert_util_1.bulkUpsert)(this.sqlRepo, values, ['status', 'updated_by', 'updated_at'], ['society_id', 'amenity_id']);
            if (inserted > 0 && updated === 0) {
                return {
                    message: specific_msg_1.SOCIETYAMENITYMAP.SUCCESS.SOCAMNT_CREATED
                };
            }
            if (updated > 0 && inserted === 0) {
                return {
                    message: specific_msg_1.SOCIETYAMENITYMAP.SUCCESS.SOCAMNT_UPDATED
                };
            }
            return {
                message: specific_msg_1.SOCIETYAMENITYMAP.SUCCESS.SOCAMNT_PARTIAL
            };
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
            throw new common_1.InternalServerErrorException(specific_msg_1.SOCIETYAMENITYMAP.ERRORS.CREATE_FAILED);
        }
    }
    async _findSql(societyId) {
        try {
            const query = `
                SELECT DISTINCT ON (am.amenity_id, cam.category_code)
                am.amenity_id,
                am.amenity_name,

                gm.gen_code AS category_code,
                gm.name AS category_name,

                ssd.society_name,

                sam.id AS mapping_id,
                sam.society_id,

                cam.status,

                CASE 
                    WHEN sam.status = 1 THEN true 
                    ELSE false 
                END AS "isMapped"

                FROM society_management.category_amenity_map cam

                INNER JOIN society_master.amenities_master am
                    ON am.amenity_id = cam.amenity_id
                    AND am.status IN (0,1)

                INNER JOIN society_master.gencode_master gm
                    ON gm.gen_code = cam.category_code
                    AND gm.status = 1

                LEFT JOIN society_management.society_amenity_mappings sam
                    ON sam.amenity_id = cam.amenity_id
                    AND sam.status != 2
                    AND ($1::uuid IS NULL OR sam.society_id = $1)

                LEFT JOIN society_management.society_setup_details ssd
                    ON ssd.society_id = sam.society_id

                WHERE cam.status IN (0,1)
            `;
            const rawData = await this.sqlRepo.query(query, [societyId || null]);
            const response = (0, society_amenity_map_getAll_response_mapper_1.societyAmenityAllResponseMapper)(rawData);
            return {
                message: specific_msg_1.SOCIETYAMENITYMAP.SUCCESS.SOCAMNT_FETCHED,
                ...response
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: societyId,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.SOCIETYAMENITYMAP.ERRORS.FETCH_FAILED);
        }
    }
};
exports.SocietyAmenityMappingsService = SocietyAmenityMappingsService;
exports.SocietyAmenityMappingsService = SocietyAmenityMappingsService = SocietyAmenityMappingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(society_amenity_map_entities_1.SocietyAmenityMappingsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SocietyAmenityMappingsService);
//# sourceMappingURL=society-amenity-mappings.service.js.map