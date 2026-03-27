import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryAmenityMapDto } from './dto/create-category-amenity-map.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryAmenityMapEntity } from './entities/category-amenity-map.entities';
import { categoryAmenityRequestMapper } from './mappers/category-amenity-map.request';
import { Repository } from 'typeorm';
import { CATGAMENITYMAP } from 'src/common/messages/specific.msg';
import { categoryAmenityResponseMapper } from './mappers/category-amenity-map.response';
import { isUUID } from 'class-validator';
import { UpdateCategoryAmenityMapDto } from './dto/update-category-amenity-map.dto';
import { categoryAmenityMapAllResponseMapper } from './mappers/category-amenity-getall.response.mapper';
import { bulkUpsert } from 'src/common/utils/bulk-upsert.util';

@Injectable()
export class CategoryAmenityMapService {
    private readonly logger = new Logger(CategoryAmenityMapService.name)

    constructor(
        @InjectRepository(CategoryAmenityMapEntity)
        private readonly sqlRepo?: Repository<CategoryAmenityMapEntity>) {

    }

    executeByAction(fnName: string, ...args: any[]) {
        const methodMap: Record<string, Function> = {
            'create': this._createSql.bind(this),
            'find': this._findSql.bind(this),
            'update': this._updateSql.bind(this)
        }
        const method = methodMap[fnName];
        if (!method) throw new Error(`Invalid function: ${fnName}`);
        return method(...args);
    }

    async _createSql(data: CreateCategoryAmenityMapDto, req: any) {
        try {
            const { categoryCode, amenityDetails } = data;

            if (!categoryCode || !amenityDetails?.length) {
                throw new BadRequestException(CATGAMENITYMAP.ERRORS.REQUIRED);
            }

            const values = amenityDetails.map((item: any) => {
                const mapped = categoryAmenityRequestMapper(categoryCode, item);

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
                ['display_order', 'status', 'metadata', 'updated_by', 'updated_at'],
                ['category_code', 'amenity_id'],
            );

            return { message: CATGAMENITYMAP.SUCCESS.CATGMAP_CREATED };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });

            throw new InternalServerErrorException(CATGAMENITYMAP.ERRORS.CREATE_FAILED);
        }
    }

    async _findSql(catgCode?: string) {
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

            const params: any[] = [];
            query += ` WHERE cam.status != 2`
            if (catgCode) {
                params.push(catgCode);
                query += ` AND cam.category_code = $1`;
            }

            const data = await this.sqlRepo!.query(query, params);
            const mappedData = categoryAmenityMapAllResponseMapper(data)
            return {
                message: CATGAMENITYMAP.SUCCESS.CATGMAP_FETCHED,
                data: mappedData
            };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: catgCode,
            });

            throw new InternalServerErrorException(
                CATGAMENITYMAP.ERRORS.FETCH_FAILED
            );
        }
    }

    /** Find one map by id (Admin use) */
    async _findOneSql(id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(CATGAMENITYMAP.ERRORS.INVALID_ID);
        }
        try {
            const foundData = await this.sqlRepo!.findOne({ where: { id } });
            if (!foundData) {
                throw new NotFoundException(CATGAMENITYMAP.ERRORS.MAP_NOT_FOUND);
            }
            const data = categoryAmenityResponseMapper(foundData);
            return { ...data, message: CATGAMENITYMAP.SUCCESS.CATGMAP_FETCHED };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: id,
            });
            throw new InternalServerErrorException(CATGAMENITYMAP.ERRORS.FETCH_FAILED);
        }
    }

    async _updateSql(data: UpdateCategoryAmenityMapDto, req: any) {
        try {
            const { categoryCode, amenityDetails } = data;
            const userId = req.user.userId;

            if (!categoryCode || !amenityDetails?.length) {
                throw new BadRequestException(CATGAMENITYMAP.ERRORS.REQUIRED);
            }

            let totalUpdated = 0;

            for (const amenity of amenityDetails) {

                const result = await this.sqlRepo!.update(
                    {
                        category_code: categoryCode,
                        amenity_id: amenity.amenityId,
                    },
                    {
                        display_order: amenity.displayOrder,
                        status: amenity.status,
                        metadata: amenity.metadata,
                        updated_by: userId,
                    }
                );

                totalUpdated += result.affected ?? 0;
            }

            if (totalUpdated === 0) {
                throw new BadRequestException(
                    CATGAMENITYMAP.ERRORS.MAP_NOT_FOUND
                );
            }

            return {
                message: CATGAMENITYMAP.SUCCESS.CATGMAP_UPDATED,
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
                CATGAMENITYMAP.ERRORS.UPDATE_FAILED
            );
        }
    }

}




