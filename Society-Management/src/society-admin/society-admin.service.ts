import { HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SOCIETYADMIN } from 'src/common/messages/specific.msg';
import { SocietySetupDetailsEntity } from 'src/society-details/entities/society-details.entity';
import { Repository } from 'typeorm';
import { servicesSocietyResponseMapper } from './mappers/society-admin.response.mappers';
import { CategoryServiceMapEntity, GencodeMasterEntity, PackageMappingEntity, ServicesMasterEntity } from '@sms/db-entities';

@Injectable()
export class SocietyAdminService {

    private readonly logger = new Logger(SocietyAdminService.name);

    constructor(
        @InjectRepository(ServicesMasterEntity)
        private readonly sqlRepo: Repository<ServicesMasterEntity>
    ) { }

    executeByActionType(fn: string, ...args: any[]) {
        const methodMap: Record<string, Function> = {
            findAll: this._findSql.bind(this)
        };

        const method = methodMap[fn];
        if (!method) throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }

    async _findSql_backup(req: any) {
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

            const result = await this.sqlRepo!.query(query, [societyId]);

            return {
                message: 'Services fetched successfully',
                data: servicesSocietyResponseMapper(result, societyId)
            };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
            });

            throw new InternalServerErrorException(SOCIETYADMIN.ERRORS.FETCH_FAILED);
        }
    }

    async _findSql(req: any) {
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

                // allowAccess CASE (EXISTS)
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

                // WHERE EXISTS (main filter)
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
                message: SOCIETYADMIN.SUCCESS.SOCADMN_FETCHED,
                data: servicesSocietyResponseMapper(result, societyId)
            };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
            });

            throw new InternalServerErrorException(SOCIETYADMIN.ERRORS.FETCH_FAILED);
        }
    }

}
