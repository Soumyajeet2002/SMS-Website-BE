import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateSocietyFlatListingDto } from './dto/create-society-flat-listing.dto';
import { societyFlatListingRequestMapper } from './mappers/society-flat-listing-request.mapper';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { societyFlatListingEntity } from './entities/society-flat-listing.entity';
import { DataSource, Repository } from 'typeorm';
import { flatListingResponseMapper } from './mappers/flat-listings.response.mapper';
import { FLAT } from 'src/common/messages/specific.msg';
import { mediaRequestMapper } from 'src/media/mappers/media.request.mapper';
import { MediaService } from 'src/media/media.service';
import { QueryFlatDto } from './dto/query-flat.dto';
import { mediaEntity } from 'src/media/entities/media.entity';

@Injectable()
export class FlatServiceService {
    private readonly logger = new Logger(FlatServiceService.name);

    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private mediaService: MediaService,
        @InjectRepository(societyFlatListingEntity)
        private readonly sqlRepo?: Repository<societyFlatListingEntity>
    ) { }

    async executeByDBType(fn: string, ...args: any[]) {
        const methodMap: Record<string, Function> = {
            create: this._createSql.bind(this),
            getAll: this._getAllSql.bind(this),
            // getById: this._getByIdSql.bind(this),
            update: this._updateSql.bind(this),
        };

        const method = methodMap[fn];
        if (!method) {
            this.logger.error(`Invalid function call: ${fn}`);
            throw new InternalServerErrorException('Invalid operation');
        }

        return method(...args);
    }

    async _createSql(data: CreateSocietyFlatListingDto, req: any) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const mappedData = societyFlatListingRequestMapper({ ...data });

            const flatValue = { ...mappedData, member_id: req.user.userId, created_by: req.user.userId };

            const flat = queryRunner.manager.create(societyFlatListingEntity, flatValue);
            await queryRunner.manager.save(flat);

            if (data.media && data.media.length > 0) {
                for (const mediaItem of data.media) {
                    await this.mediaService.executeByDBType(
                        'create', { ...mediaItem, entityId: flat.id, societyId: flat.society_id, entityType: 'flat_listing', },
                        req,
                        queryRunner.manager
                    );
                }
            }

            await queryRunner.commitTransaction();

            return { message: 'Flat listing created successfully' };

        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });

            throw new InternalServerErrorException('Failed to create flat listing');

        } finally {
            await queryRunner.release();
        }
    }


    async _getAllSql(query: QueryFlatDto) {
        try {
            const hasQuery =
                query.societyId ||
                query.memberId ||
                query.flatType ||
                query.furnishingType ||
                query.pincode ||
                query.page ||
                query.limit ||
                query.sortBy ||
                query.sortOrder;

            const qb = this.sqlRepo!
                .createQueryBuilder('flat')
                .leftJoinAndMapMany(
                    'flat.media',
                    mediaEntity,
                    'media',
                    `
                    media.entity_id = flat.id
                    AND media.entity_type = :entityType
                    AND media.society_id = flat.society_id
                    AND media.status = 1
                    AND media.deleted_at IS NULL
                    `,
                    { entityType: 'flat_listing' }
                )
                .where('flat.deleted_at IS NULL');

            // ---------- Filters ----------

            if (query.societyId) {
                qb.andWhere('flat.society_id = :societyId', {
                    societyId: query.societyId,
                });
            }

            if (query.memberId) {
                qb.andWhere('flat.member_id = :memberId', {
                    memberId: query.memberId,
                });
            }

            if (query.flatType) {
                qb.andWhere('flat.flat_type ILIKE :flatType', {
                    flatType: `%${query.flatType}%`,
                });
            }

            if (query.furnishingType) {
                qb.andWhere('flat.furnishing_type ILIKE :furnishingType', {
                    furnishingType: `%${query.furnishingType}%`,
                });
            }

            if (query.pincode) {
                qb.andWhere('flat.pincode = :pincode', {
                    pincode: query.pincode,
                });
            }

            // --------------------------------------------------
            // CASE 1: No query params → Return ALL
            // --------------------------------------------------

            if (!hasQuery) {
                const data = await qb
                    .orderBy('flat.created_at', 'DESC')
                    .getMany();

                return {
                    message: 'Flat listings fetched successfully',
                    page: null,
                    limit: null,
                    total: data.length,
                    totalPages: 1,
                    data: flatListingResponseMapper(data)
                };
            }

            // --------------------------------------------------
            // CASE 2: Query params present → Paginate
            // --------------------------------------------------

            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;

            const allowedSortFields = [
                'created_at',
                'rent_amount',
                'available_from',
            ];

            const sortBy = allowedSortFields.includes(query.sortBy!)
                ? query.sortBy
                : 'created_at';

            const sortOrder =
                query.sortOrder === 'ASC' ? 'ASC' : 'DESC';

            const skip = (page - 1) * limit;

            qb.orderBy(`flat.${sortBy}`, sortOrder)
                .skip(skip)
                .take(limit);

            const [data, total] = await qb.getManyAndCount();
            console.log("data--------------->", data);

            return {
                message: 'Flat listings fetched successfully',
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: flatListingResponseMapper(data)
            };
        } catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: query,
            });

            throw new InternalServerErrorException('Failed to fetch flat listings');
        }
    }


    async _updateSql(data: any, req: any) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const { id, media, ...updateData } = data;

            if (!id) {
                throw new BadRequestException(FLAT.ERRORS.REQUIRED);
            }

            const existing = await queryRunner.manager.findOne(
                societyFlatListingEntity,
                { where: { id } }
            );

            if (!existing) {
                throw new BadRequestException(FLAT.ERRORS.FLAT_NOT_FOUND);
            }

            // Prevent updating restricted fields
            delete updateData.createdAt;
            delete updateData.createdBy;

            const mappedData = societyFlatListingRequestMapper(updateData);

            const cleanedData = Object.fromEntries(
                Object.entries(mappedData).filter(([_, v]) => v !== undefined)
            );

            // Update flat
            await queryRunner.manager.update(
                societyFlatListingEntity,
                { id },
                {
                    ...cleanedData,
                    updated_at: new Date(),
                    member_id: req.user.userId
                }
            );

            // Handle media sync
            if (media) {

                const mediaRepo = queryRunner.manager.getRepository(mediaEntity);

                // Get existing DB media
                const dbMedia = await mediaRepo.find({
                    where: {
                        entity_id: id,
                        entity_type: 'flat_listing',
                        society_id: existing.society_id
                    }
                });

                const requestMediaIds = media
                    .filter((m: any) => m.id)
                    .map((m: any) => m.id);

                for (const mediaItem of media) {

                    if (mediaItem.id) {
                        // UPDATE existing
                        await this.mediaService._updateSql(
                            mediaItem,
                            req,
                            queryRunner.manager
                        );

                    } else {
                        // CREATE new
                        await this.mediaService._createSql(
                            {
                                ...mediaItem,
                                entityId: id,
                                entityType: 'flat_listing',
                                societyId: existing.society_id
                            },
                            req,
                            queryRunner.manager
                        );
                    }
                }

                // Soft delete removed media
                for (const dbItem of dbMedia) {
                    if (!requestMediaIds.includes(dbItem.id)) {
                        await mediaRepo.update(
                            { id: dbItem.id },
                            {
                                status: 2,
                                deleted_at: new Date()
                            }
                        );
                    }
                }
            }

            await queryRunner.commitTransaction();

            const updated = await queryRunner.manager.findOne(
                societyFlatListingEntity,
                { where: { id } }
            );

            return {
                message: FLAT.SUCCESS.FLAT_UPDATED
            };

        } catch (error) {
            await queryRunner.rollbackTransaction();

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });

            throw new InternalServerErrorException(FLAT.ERRORS.UPDATE_FAILED);

        } finally {
            await queryRunner.release();
        }
    }



}
