import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mediaEntity } from './entities/media.entity';
import { EntityManager, Repository } from 'typeorm';
import { mediaRequestMapper } from './mappers/media.request.mapper';
import { CreateMediaDto } from './dto/create-media.dto';
import { MEDIA } from 'src/common/messages/specific.msg';
import { mediaResponseMapper } from './mappers/media.response.mapper';

@Injectable()
export class MediaService {
    private readonly logger = new Logger(MediaService.name);

    constructor(
        @InjectRepository(mediaEntity)
        private readonly sqlRepo: Repository<mediaEntity>
    ) { }

    async executeByDBType(fn: string, ...args: any[]) {
        const methodMap: Record<string, Function> = {
            create: this._createSql.bind(this),
            getAll: this._getAllSql.bind(this),
            update: this._updateSql.bind(this),
        };

        const method = methodMap[fn];
        if (!method) {
            this.logger.error(`Invalid function call: ${fn}`);
            throw new InternalServerErrorException('Invalid operation');
        }

        return method(...args);
    }

    async _createSql(data: any, req: any, manager?: EntityManager) {
        try {

            // Determine mediaType from mimeType
            let mediaType: number;

            if (data.mimeType?.startsWith('image/')) {
                mediaType = 1; // Image
            } else if (data.mimeType?.startsWith('video/')) {
                mediaType = 2; // Video
            } else if (data.mimeType?.startsWith('audio/')) {
                mediaType = 4; // Audio
            } else {
                mediaType = 3; // Document (default fallback)
            }
            data.mediaType = mediaType;
            const mappedData = mediaRequestMapper(data)

            const value = {
                ...mappedData,
                created_by: req.user.userId,
            };

            let repo: Repository<mediaEntity>;

            if (manager) {
                repo = manager.getRepository(mediaEntity);
            } else {
                if (!this.sqlRepo) {
                    throw new InternalServerErrorException('Repository not initialized');
                }
                repo = this.sqlRepo;
            }

            const createdEntity = repo.create(value);
            await repo.save(createdEntity);

            return {
                message: MEDIA.SUCCESS.MEDIA_CREATED
            };

        } catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });

            throw new InternalServerErrorException(MEDIA.ERRORS.CREATE_FAILED);
        }
    }


    async _getAllSql() {
        try {
            const data = await this.sqlRepo!.find({ where: { status: 1 } });

            const mappedData = mediaResponseMapper(data);

            return {
                message: MEDIA.SUCCESS.MEDIA_FETCHED,
                data: mappedData,
            };

        } catch (error) {

            this.logger.error({
                error: error.message,
                stack: error.stack,
            });

            throw new InternalServerErrorException(MEDIA.ERRORS.FETCH_FAILED);
        }
    }

    async _updateSql(data: any, req: any, manager?: EntityManager) {
        try {
            const { id, ...updateData } = data;

            if (!id) {
                throw new BadRequestException(MEDIA.ERRORS.REQUIRED);
            }

            const repo: Repository<mediaEntity> = manager
                ? manager.getRepository(mediaEntity)
                : this.sqlRepo!;

            const existing = await repo.findOne({
                where: { id }
            });

            if (!existing) {
                throw new BadRequestException(
                    MEDIA.ERRORS.MEDIA_NOT_FOUND
                );
            }

            // 🔐 NEVER allow changing these fields
            delete updateData.created_at;
            delete updateData.created_by;
            delete updateData.societyId;
            delete updateData.entityId;
            delete updateData.entityType;
            delete updateData.deleted_at;

            // 🔹 Recalculate mediaType if mimeType is updated
            if (updateData.mimeType) {
                if (updateData.mimeType.startsWith('image/')) {
                    updateData.mediaType = 1;
                } else if (updateData.mimeType.startsWith('video/')) {
                    updateData.mediaType = 2;
                } else if (updateData.mimeType.startsWith('audio/')) {
                    updateData.mediaType = 4;
                } else {
                    updateData.mediaType = 3;
                }
            }

            const mappedUpdateData = mediaRequestMapper(updateData);

            // 🔹 Soft delete handling
            if (mappedUpdateData?.status === 2) {
                mappedUpdateData.deleted_at = new Date();
            } else if (mappedUpdateData?.status !== undefined) {
                mappedUpdateData.deleted_at = null;
            }

            // 🔹 Ensure only one primary media per entity
            if (mappedUpdateData?.is_primary === true) {
                await repo.update(
                    {
                        entity_type: existing.entity_type,
                        entity_id: existing.entity_id,
                        is_primary: true,
                    },
                    { is_primary: false }
                );
            }

            await repo.update(
                { id },
                {
                    ...mappedUpdateData,
                    updated_at: new Date()
                }
            );

            return {
                message: MEDIA.SUCCESS.MEDIA_UPDATED ?? 'Media updated successfully',
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
                MEDIA.ERRORS.UPDATE_FAILED
            );
        }
    }




}
