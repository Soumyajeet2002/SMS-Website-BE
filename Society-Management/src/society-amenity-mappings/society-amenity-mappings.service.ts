import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocietyAmenityMappingsEntity } from './entities/society-amenity-map.entities';
import { Repository } from 'typeorm';
import { CreateSocietyAmenityMapDto } from './dto/create-society-amenity-map.dto';
import { societyAmenityMapRequestMapper } from './mappers/society-amenity-map.request.mapper';
import { bulkUpsert } from 'src/common/utils/bulk-upsert.util';
import { SOCIETYAMENITYMAP } from 'src/common/messages/specific.msg';
import { societyAmenityAllResponseMapper } from './mappers/society-amenity-map.getAll.response.mapper';

@Injectable()
export class SocietyAmenityMappingsService {
    private readonly logger = new Logger(SocietyAmenityMappingsService.name)

    constructor(
        @InjectRepository(SocietyAmenityMappingsEntity)
        private readonly sqlRepo?: Repository<SocietyAmenityMappingsEntity>) {
    }

    executeByAction(fnName: string, ...args: any[]) {
        const methodMap: Record<string, Function> = {
            'create': this._createSql.bind(this),
            // 'find': this._findAllSql.bind(this),
            'findById': this._findSql.bind(this)
        }
        const method = methodMap[fnName];
        if (!method) throw new Error(`Invalid function: ${fnName}`);
        return method(...args);
    }

    async _createSql(data: CreateSocietyAmenityMapDto, req: any) {
        try {

            const { societyId, amenityDetails } = data;

            if (!societyId || !amenityDetails?.length) {
                throw new BadRequestException(SOCIETYAMENITYMAP.ERRORS.REQUIRED);
            }

            const values = amenityDetails.map((item: any) => {
                const mapped = societyAmenityMapRequestMapper(
                    societyId,
                    item.amenityId,
                    item
                );

                return {
                    ...mapped,
                    created_by: req.user.userId,
                    updated_by: req.user.userId,
                    updated_at: new Date(),
                };
            });

            const { inserted, updated } = await bulkUpsert(
                this.sqlRepo!,
                values,
                ['status', 'updated_by', 'updated_at'],
                ['society_id', 'amenity_id']   // unique key
            );

            if (inserted > 0 && updated === 0) {
                return {
                    message: SOCIETYAMENITYMAP.SUCCESS.SOCAMNT_CREATED
                };
            }

            if (updated > 0 && inserted === 0) {
                return {
                    message: SOCIETYAMENITYMAP.SUCCESS.SOCAMNT_UPDATED
                };
            }

            return {
                message: SOCIETYAMENITYMAP.SUCCESS.SOCAMNT_PARTIAL
            };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });

            throw new InternalServerErrorException(
                SOCIETYAMENITYMAP.ERRORS.CREATE_FAILED
            );
        }
    }

    // async _findAllSql(req: any) {
    //     try {
    //         let societyId = req.user.societyId
    //         console.log('societyid-------------', societyId);

    //         const qb = this.sqlRepo!
    //             .createQueryBuilder('sam')

    //             .innerJoin(AmenityEntity, 'am', 'am.amenityId = sam.amenity_id')
    //             .innerJoin(
    //                 SocietySetupDetailsEntity,
    //                 'ssd',
    //                 'ssd.society_id = sam.society_id'
    //             )

    //             // ✅ use ENTITY instead of schema string
    //             .innerJoin(
    //                 GencodeMasterEntity,
    //                 'gm',
    //                 `gm.id IN (
    //         ${this.sqlRepo!
    //                     .createQueryBuilder()
    //                     .subQuery()
    //                     .select('pm.map_ref_code')
    //                     .from(PackageMappingsEntity, 'pm')
    //                     .where('pm.package_id = :packageId')
    //                     .andWhere('pm.status = 1')
    //                     .andWhere('pm.map_type = :mapType')
    //                     .getQuery()
    //                 }
    //     )
    //     AND gm.status = 1`
    //             )

    //             .select([
    //                 'sam.id AS id',
    //                 'sam.society_id AS society_id',
    //                 'sam.amenity_id AS amenity_id',
    //                 'sam.status AS status',

    //                 'ssd.society_name AS society_name',
    //                 'am.amenity_name AS amenity_name',

    //                 'gm.gen_code AS gen_code',
    //                 'gm.name AS name'
    //             ])

    //             .where('sam.status != :deletedStatus', { deletedStatus: 2 })

    //             // ✅ dynamic params
    //             .setParameters({
    //                 packageId: packageId,   // 🔥 pass from function
    //                 mapType: 'SER_CATEGORY'
    //             });

    //         if (societyId) {
    //             qb.andWhere('sam.society_id = :societyId', { societyId });
    //         }

    //         const data = await qb.getRawMany();

    //         const finaldata = societyAmenityAllResponseMapper(data);

    //         return {
    //             message: SOCIETYAMENITYMAP.SUCCESS.SOCAMNT_FETCHED,
    //             ...finaldata
    //         };

    //     } catch (error) {

    //         if (error instanceof HttpException) {
    //             throw error;
    //         }

    //         this.logger.error({
    //             error: error.message,
    //             stack: error.stack,
    //             // payload: societyId,
    //         });

    //         throw new InternalServerErrorException(
    //             SOCIETYAMENITYMAP.ERRORS.FETCH_FAILED
    //         );
    //     }
    // }

    // async _findSql(societyId?: string) {
    //     try {

    //         const qb = this.sqlRepo!
    //             .createQueryBuilder('sam')

    //             // Amenity join
    //             .innerJoin(AmenityEntity, 'am', 'am.amenityId = sam.amenity_id')

    //             // Society join
    //             .innerJoin(
    //                 SocietySetupDetailsEntity,
    //                 'ssd',
    //                 'ssd.society_id = sam.society_id'
    //             )

    //             // Category mapping (LEFT JOIN because optional)
    //             .leftJoin(
    //                 CategoryAmenityMapEntity,
    //                 'cam',
    //                 'cam.amenity_id = am.amenityId AND cam.status = 1'
    //             )

    //             // Category master
    //             .leftJoin(
    //                 GencodeMasterEntity,
    //                 'gm',
    //                 'gm.gen_code = cam.category_code AND gm.status = 1'
    //             )

    //             .select([
    //                 'sam.id AS id',
    //                 'sam.society_id AS society_id',
    //                 'sam.amenity_id AS amenity_id',
    //                 'sam.status AS status',

    //                 'ssd.society_name AS society_name',

    //                 'am.amenity_name AS amenity_name',

    //                 // Category fields
    //                 'gm.gen_code AS category_code',
    //                 'gm.name AS category_name'
    //             ])

    //             .where('sam.status != :deletedStatus', { deletedStatus: 2 })
    //             .andWhere('am.status IN (:...amStatus)', { amStatus: [0, 1] });

    //         if (societyId) {
    //             qb.andWhere('sam.society_id = :societyId', { societyId });
    //         }

    //         const rawData = await qb.getRawMany();

    //         // 🔥 Transform into required structure
    //         const response = societyAmenityAllResponseMapper(rawData);

    //         return {
    //             status: 201,
    //             message: SOCIETYAMENITYMAP.SUCCESS.SOCAMNT_FETCHED,
    //             data: response
    //         };

    //     } catch (error) {

    //         if (error instanceof HttpException) {
    //             throw error;
    //         }

    //         this.logger.error({
    //             error: error.message,
    //             stack: error.stack,
    //             payload: societyId,
    //         });

    //         throw new InternalServerErrorException(
    //             SOCIETYAMENITYMAP.ERRORS.FETCH_FAILED
    //         );
    //     }
    // }

    async _findSql(societyId?: string) {
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

            const rawData = await this.sqlRepo!.query(query, [societyId || null]);

            const response = societyAmenityAllResponseMapper(rawData);

            return {
                message: SOCIETYAMENITYMAP.SUCCESS.SOCAMNT_FETCHED,
                ...response
            };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: societyId,
            });

            throw new InternalServerErrorException(
                SOCIETYAMENITYMAP.ERRORS.FETCH_FAILED
            );
        }
    }

}
