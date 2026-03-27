import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageTierMapEntity } from './entities/package-tier-map.entities';
import { Repository } from 'typeorm';
import { CreatePackageTierMapDto } from './dto/create-package-tier-map.dto';
import { packageTierMapRequestMapper } from './mappers/package-tier-map.request.mapper';
import { packageTierMapResponseMapper } from './mappers/package-tier-map.response.mapper';
import { isUUID } from 'class-validator';
import { UpdatePackageTierMapDto } from './dto/update-package-tier-map.dto';
import { PACKAGETIERMAP } from 'src/common/messages/specific.msg';
import { packageTierAllResponseMapper } from './mappers/package-tie-getall.response.mapper';
import { bulkUpsert } from 'src/common/utils/bulk-upsert.util';

@Injectable()
export class PackageTierMapService {
    private readonly logger = new Logger(PackageTierMapService.name)

    constructor(
        @InjectRepository(PackageTierMapEntity)
        private readonly sqlRepo?: Repository<PackageTierMapEntity>) {
    }

    executeByAction(fnName: string, ...args: any[]) {
        const methodMap: Record<string, Function> = {
            'create': this._createSql.bind(this),
            'find': this._findAllSql.bind(this),
            'update': this._updateSql.bind(this),
        }
        const method = methodMap[fnName];
        if (!method) throw new Error(`Invalid function: ${fnName}`);
        return method(...args);
    }

    async _createSql(data: CreatePackageTierMapDto, req: any) {
        try {
            const { packageId, tierDetails } = data;

            if (!packageId || !tierDetails?.length) {
                throw new BadRequestException(PACKAGETIERMAP.ERRORS.REQUIRED);
            }

            const values = tierDetails.map((item: any) => {
                const mapped = packageTierMapRequestMapper(packageId, item);

                return {
                    ...mapped,
                    created_by: req.user.userId,
                    updated_by: req.user.userId,
                    updated_at: new Date(),
                };
            });

            await bulkUpsert(
                this.sqlRepo!,
                values,
                ['status', 'updated_by', 'updated_at'],
                // 'tier_price', 'is_included'
                ['package_id', 'tier_code']

            );

            return { message: PACKAGETIERMAP.SUCCESS.PKGTIERMAP_CREATED };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });

            throw new InternalServerErrorException(PACKAGETIERMAP.ERRORS.CREATE_FAILED);
        }
    }

    async _findAllSql(tierCode?: string) {
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

            const params: any[] = [];
            query += ` WHERE ptm.status != 2 `;
            if (tierCode) {
                query += `  AND ptm.tier_code = $1 ;`;
                params.push(tierCode);
            }

            const data = await this.sqlRepo?.query(query, params);
            const finaldata = packageTierAllResponseMapper(data);

            return { message: PACKAGETIERMAP.SUCCESS.PKGTIERMAP_FETCHED, data: finaldata };

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: tierCode,
            });

            throw new InternalServerErrorException(PACKAGETIERMAP.ERRORS.FETCH_FAILED);
        }
    }

    /** Find one map by id (Admin use) */
    async _findOneSql(id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(PACKAGETIERMAP.ERRORS.INVALID_ID);
        }
        try {
            const foundData = await this.sqlRepo!.findOne({ where: { id } });
            if (!foundData) {
                throw new NotFoundException(PACKAGETIERMAP.ERRORS.MAP_NOT_FOUND);
            }
            const data = packageTierMapResponseMapper(foundData);
            return { ...data, message: PACKAGETIERMAP.SUCCESS.PKGTIERMAP_FETCHED };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: id,
            });
            throw new InternalServerErrorException(PACKAGETIERMAP.ERRORS.FETCH_FAILED);
        }
    }

    async _updateSql(data: UpdatePackageTierMapDto, req: any) {
        try {
            const { packageId, tierDetails } = data;
            const userId = req.user.userId;

            if (!packageId || !tierDetails?.length) {
                throw new BadRequestException(PACKAGETIERMAP.ERRORS.REQUIRED);
            }

            let totalUpdated = 0;

            for (const tier of tierDetails) {

                const result = await this.sqlRepo!.update(
                    {
                        package_id: packageId,
                        tier_code: tier.tierCode,
                    },
                    {
                        // tier_price: tier.tierPrice,
                        // is_included: tier.isIncluded,
                        status: tier.status,
                        updated_by: userId,
                        updated_at: new Date(),
                    }
                );

                totalUpdated += result.affected ?? 0;
            }

            if (totalUpdated === 0) {
                throw new BadRequestException(PACKAGETIERMAP.ERRORS.MAP_NOT_FOUND);
            }

            return { message: PACKAGETIERMAP.SUCCESS.PKGTIERMAP_UPDATED };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: { data }
            });

            throw new InternalServerErrorException(PACKAGETIERMAP.ERRORS.UPDATE_FAILED);
        }
    }
}
