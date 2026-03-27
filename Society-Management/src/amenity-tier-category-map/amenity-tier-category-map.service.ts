import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TierCategoryMapEntity } from './entities/amenity-tier-category-map.entities';
import { CreateAmenityTierCategoryMapDto } from './dto/create-amenity-tier-category-map.dto';
import { UpdateAmenityTierCategoryMap } from './dto/update-amenity-tier-category-map.dto';
import { amenityTierCategoryMapReqMapper } from './mappers/amenity-tier-category-map.request.mapper';
import { isUUID } from 'class-validator';
import { AMENITYTIERCATGMAP } from 'src/common/messages/specific.msg';
import { amenityTierCategoryMapResponseMapper } from './mappers/amenity-tier-category-map.response';
import { amenityTierCategoryAllResponseMapper } from './mappers/amenity-tier-category-getall.response.mapper';
import { bulkUpsert } from 'src/common/utils/bulk-upsert.util';

@Injectable()
export class TierCategoryMapService {

    private readonly logger = new Logger(TierCategoryMapService.name);

    constructor(
        @InjectRepository(TierCategoryMapEntity)
        private readonly sqlRepo?: Repository<TierCategoryMapEntity>
    ) { }

    executeByActionType(fn: string, ...args: any[]) {
        const methodMap: Record<string, Function> = {
            create: this._createSql.bind(this),
            findAll: this._findSql.bind(this),
            findOne: this._findOneSql.bind(this),
            update: this._updateSql.bind(this),
            remove: this._removeSql.bind(this),
        };

        const method = methodMap[fn];
        if (!method) throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }

    async _createSql(data: CreateAmenityTierCategoryMapDto, req: any) {
        try {
            const { tierCode, categoryDetails } = data;

            const values = categoryDetails.map((category) => {
                const mapped = amenityTierCategoryMapReqMapper(
                    tierCode,
                    category
                );

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
                ['display_order', 'status', 'updated_by', 'updated_at'],
                ['tier_code', 'category_code'],
            );

            return {
                message: AMENITYTIERCATGMAP.SUCCESS.USERMAP_CREATED,
            };

        } catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });

            throw new InternalServerErrorException(
                AMENITYTIERCATGMAP.ERRORS.CREATE_FAILED
            );
        }
    }


    async _findSql(tierCode?: string) {
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

            const params: any[] = [];
            query += ` WHERE atcm.status != 2 `;
            if (tierCode) {
                params.push(tierCode);
                query += ` AND atcm.tier_code = $1`;
            }

            const result = await this.sqlRepo!.query(query, params);

            const mappedData = amenityTierCategoryAllResponseMapper(result);

            return {
                message: "Amenity tier category list fetched successfully",
                data: mappedData
            };

        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: tierCode,
            });

            throw new InternalServerErrorException(
                AMENITYTIERCATGMAP.ERRORS.FETCH_FAILED,
            );
        }
    }


    async _findOneSql(id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(AMENITYTIERCATGMAP.ERRORS.INVALID_ID);
        }
        try {
            const mapped = await this.sqlRepo!.findOne({ where: { id } });
            if (!mapped) {
                throw new NotFoundException(AMENITYTIERCATGMAP.ERRORS.MAP_NOT_FOUND);
            }
            let data = amenityTierCategoryMapResponseMapper(mapped)
            return { ...data, message: AMENITYTIERCATGMAP.SUCCESS.USERMAP_FETCHED };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: id,
            });
            throw new InternalServerErrorException(AMENITYTIERCATGMAP.ERRORS.FETCH_FAILED)
        }
    }

    async _updateSql(data: UpdateAmenityTierCategoryMap, req: any) {
        try {
            const { tierCode, categoryDetails } = data;
            const userId = req.user.userId;

            if (!tierCode || !categoryDetails?.length) {
                throw new BadRequestException(AMENITYTIERCATGMAP.ERRORS.REQUIRED);
            }

            let totalUpdated = 0;

            for (const category of categoryDetails) {

                const result = await this.sqlRepo!.update(
                    {
                        tier_code: tierCode,
                        category_code: category.categoryCode,
                    },
                    {
                        display_order: category.displayOrder,
                        status: category.status,
                        updated_by: userId,
                    }
                );

                totalUpdated += result.affected ?? 0;
            }

            if (totalUpdated === 0) {
                throw new BadRequestException(AMENITYTIERCATGMAP.ERRORS.MAP_NOT_FOUND);
            }

            return {
                message: AMENITYTIERCATGMAP.SUCCESS.USERMAP_UPDATED,
                updatedCount: totalUpdated,
            };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: { data },
            });

            throw new InternalServerErrorException(
                AMENITYTIERCATGMAP.ERRORS.UPDATE_FAILED
            );
        }
    }


    async _removeSql(id: string) {
        try {
            await this._findOneSql(id)

            await this.sqlRepo!.update({ id }, { status: 2 })

            return { message: AMENITYTIERCATGMAP.SUCCESS.USERMAP_DELETED };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            // Unexpected / DB errors → log
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: id,
            });

            throw new InternalServerErrorException(AMENITYTIERCATGMAP.ERRORS.DELETE_FAILED);
        }
    }

}
