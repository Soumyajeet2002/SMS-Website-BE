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
var SocietyAdminService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocietyAdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const specific_msg_1 = require("../common/messages/specific.msg");
const typeorm_2 = require("typeorm");
const society_admin_response_mappers_1 = require("./mappers/society-admin.response.mappers");
const db_entities_1 = require("@sms/db-entities");
let SocietyAdminService = SocietyAdminService_1 = class SocietyAdminService {
    sqlRepo;
    logger = new common_1.Logger(SocietyAdminService_1.name);
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            findAll: this._findSql.bind(this)
        };
        const method = methodMap[fn];
        if (!method)
            throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }
    async _findSql_backup(req) {
        const societyId = req.user.societyId;
        try {
            const query = `
          SELECT
            sm.service_id AS "serviceId",
            sm.service_name AS "serviceName",
            sm.metadata AS "metaData",
            sm.icon_url AS "iconUrl",
            sm.display_order AS "displayOrder",
            CASE
            WHEN EXISTS (
            SELECT 1
            FROM society_master.category_service_map csm
            JOIN society_master.gencode_master gm
            ON gm.gen_code = csm.category_code
            JOIN society_master.package_mappings pm
            ON pm.map_ref_code = gm.id
            LEFT JOIN society_management.society_setup_details ssd
            ON ssd.package_id = pm.package_id
            AND ssd.society_id = $1
            WHERE csm.service_id = sm.service_id
            AND csm.status = 1
            AND pm.status = 1
            AND ssd.package_id IS NOT NULL   -- only beta (society-mapped) package
            )
            THEN 1 ELSE 0
            END AS "allowAccess"
            FROM society_master.services_master sm
            WHERE EXISTS (
            SELECT 1
            FROM society_master.category_service_map csm
            JOIN society_master.gencode_master gm
            ON gm.gen_code = csm.category_code
            JOIN society_master.package_mappings pm
            ON pm.map_ref_code = gm.id
            WHERE csm.service_id = sm.service_id
            AND csm.status = 1
            AND pm.status = 1
            )
            ORDER BY sm.display_order;
        `;
            const result = await this.sqlRepo.query(query, [societyId]);
            return {
                message: 'Services fetched successfully',
                data: (0, society_admin_response_mappers_1.servicesSocietyResponseMapper)(result, societyId)
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.SOCIETYADMIN.ERRORS.FETCH_FAILED);
        }
    }
    async _findSql(req) {
        const societyId = req.user.societyId;
        try {
            const query = this.sqlRepo
                .createQueryBuilder('sm')
                .select([
                'sm.service_id AS "serviceId"',
                'sm.service_name AS "serviceName"',
                'sm.metadata AS "metaData"',
                'sm.icon_url AS "iconUrl"',
                'sm.display_order AS "displayOrder"',
            ])
                .addSelect(`
                CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM society_master.category_service_map csm
                    JOIN society_master.gencode_master gm
                        ON gm.gen_code = csm.category_code
                    JOIN society_master.package_mappings pm
                        ON pm.map_ref_code = gm.id
                    LEFT JOIN society_management.society_setup_details ssd
                        ON ssd.package_id = pm.package_id
                        AND ssd.society_id = :societyId
                    WHERE csm.service_id = sm.service_id
                    AND csm.status = 1
                    AND pm.status = 1
                    AND ssd.package_id IS NOT NULL
                    )
                    THEN 1 ELSE 0
                    END
                `, 'allowAccess')
                .where(`
                    EXISTS (
                        SELECT 1
                        FROM society_master.category_service_map csm
                        JOIN society_master.gencode_master gm
                            ON gm.gen_code = csm.category_code
                        JOIN society_master.package_mappings pm
                            ON pm.map_ref_code = gm.id
                        WHERE csm.service_id = sm.service_id
                        AND csm.status = 1
                        AND pm.status = 1
                    )
                `)
                .setParameter('societyId', societyId)
                .orderBy('sm.service_name', 'ASC');
            const result = await query.getRawMany();
            return {
                message: specific_msg_1.SOCIETYADMIN.SUCCESS.SOCADMN_FETCHED,
                data: (0, society_admin_response_mappers_1.servicesSocietyResponseMapper)(result, societyId)
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.SOCIETYADMIN.ERRORS.FETCH_FAILED);
        }
    }
};
exports.SocietyAdminService = SocietyAdminService;
exports.SocietyAdminService = SocietyAdminService = SocietyAdminService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(db_entities_1.ServicesMasterEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SocietyAdminService);
//# sourceMappingURL=society-admin.service.js.map