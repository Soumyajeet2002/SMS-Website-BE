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
var PackageTierMapService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageTierMapService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const package_tier_map_entities_1 = require("./entities/package-tier-map.entities");
const typeorm_2 = require("typeorm");
const package_tier_map_request_mapper_1 = require("./mappers/package-tier-map.request.mapper");
const package_tier_map_response_mapper_1 = require("./mappers/package-tier-map.response.mapper");
const class_validator_1 = require("class-validator");
const specific_msg_1 = require("../common/messages/specific.msg");
const package_tie_getall_response_mapper_1 = require("./mappers/package-tie-getall.response.mapper");
const bulk_upsert_util_1 = require("../common/utils/bulk-upsert.util");
let PackageTierMapService = PackageTierMapService_1 = class PackageTierMapService {
    sqlRepo;
    logger = new common_1.Logger(PackageTierMapService_1.name);
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    executeByAction(fnName, ...args) {
        const methodMap = {
            'create': this._createSql.bind(this),
            'find': this._findAllSql.bind(this),
            'update': this._updateSql.bind(this),
        };
        const method = methodMap[fnName];
        if (!method)
            throw new Error(`Invalid function: ${fnName}`);
        return method(...args);
    }
    async _createSql(data, req) {
        try {
            const { packageId, tierDetails } = data;
            if (!packageId || !tierDetails?.length) {
                throw new common_1.BadRequestException(specific_msg_1.PACKAGETIERMAP.ERRORS.REQUIRED);
            }
            const values = tierDetails.map((item) => {
                const mapped = (0, package_tier_map_request_mapper_1.packageTierMapRequestMapper)(packageId, item);
                return {
                    ...mapped,
                    created_by: req.user.userId,
                    updated_by: req.user.userId,
                    updated_at: new Date(),
                };
            });
            await (0, bulk_upsert_util_1.bulkUpsert)(this.sqlRepo, values, ['status', 'updated_by', 'updated_at'], ['package_id', 'tier_code']);
            return { message: specific_msg_1.PACKAGETIERMAP.SUCCESS.PKGTIERMAP_CREATED };
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
            throw new common_1.InternalServerErrorException(specific_msg_1.PACKAGETIERMAP.ERRORS.CREATE_FAILED);
        }
    }
    async _findAllSql(tierCode) {
        try {
            let query = `
      SELECT
        ptm.id,
        ptm.tier_code,
        ptm.status,
        ptm.created_by,
        ptm.created_at,
        ptm.updated_by,
        ptm.updated_at,

        gm.name as tier_name ,

        pm.package_code,
        pm.package_name,
        pm.billing_cycle,
        pm.price,
        pm.allows_trial,
        pm.trial_days

        FROM society_management.package_tier_map AS ptm

        JOIN society_master.package_master AS pm
        ON pm.package_id = ptm.package_id

        JOIN society_master.gencode_master AS gm
        ON gm.gen_code = ptm.tier_code 
    `;
            const params = [];
            query += ` WHERE ptm.status != 2 `;
            if (tierCode) {
                query += `  AND ptm.tier_code = $1 ;`;
                params.push(tierCode);
            }
            const data = await this.sqlRepo?.query(query, params);
            const finaldata = (0, package_tie_getall_response_mapper_1.packageTierAllResponseMapper)(data);
            return { message: specific_msg_1.PACKAGETIERMAP.SUCCESS.PKGTIERMAP_FETCHED, data: finaldata };
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
            throw new common_1.InternalServerErrorException(specific_msg_1.PACKAGETIERMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _findOneSql(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException(specific_msg_1.PACKAGETIERMAP.ERRORS.INVALID_ID);
        }
        try {
            const foundData = await this.sqlRepo.findOne({ where: { id } });
            if (!foundData) {
                throw new common_1.NotFoundException(specific_msg_1.PACKAGETIERMAP.ERRORS.MAP_NOT_FOUND);
            }
            const data = (0, package_tier_map_response_mapper_1.packageTierMapResponseMapper)(foundData);
            return { ...data, message: specific_msg_1.PACKAGETIERMAP.SUCCESS.PKGTIERMAP_FETCHED };
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
            throw new common_1.InternalServerErrorException(specific_msg_1.PACKAGETIERMAP.ERRORS.FETCH_FAILED);
        }
    }
    async _updateSql(data, req) {
        try {
            const { packageId, tierDetails } = data;
            const userId = req.user.userId;
            if (!packageId || !tierDetails?.length) {
                throw new common_1.BadRequestException(specific_msg_1.PACKAGETIERMAP.ERRORS.REQUIRED);
            }
            let totalUpdated = 0;
            for (const tier of tierDetails) {
                const result = await this.sqlRepo.update({
                    package_id: packageId,
                    tier_code: tier.tierCode,
                }, {
                    status: tier.status,
                    updated_by: userId,
                    updated_at: new Date(),
                });
                totalUpdated += result.affected ?? 0;
            }
            if (totalUpdated === 0) {
                throw new common_1.BadRequestException(specific_msg_1.PACKAGETIERMAP.ERRORS.MAP_NOT_FOUND);
            }
            return { message: specific_msg_1.PACKAGETIERMAP.SUCCESS.PKGTIERMAP_UPDATED };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: { data }
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.PACKAGETIERMAP.ERRORS.UPDATE_FAILED);
        }
    }
};
exports.PackageTierMapService = PackageTierMapService;
exports.PackageTierMapService = PackageTierMapService = PackageTierMapService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(package_tier_map_entities_1.PackageTierMapEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PackageTierMapService);
//# sourceMappingURL=package-tier-map.service.js.map