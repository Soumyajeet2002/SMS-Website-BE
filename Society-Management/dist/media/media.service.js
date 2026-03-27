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
var MediaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const media_entity_1 = require("./entities/media.entity");
const typeorm_2 = require("typeorm");
const media_request_mapper_1 = require("./mappers/media.request.mapper");
const specific_msg_1 = require("../common/messages/specific.msg");
const media_response_mapper_1 = require("./mappers/media.response.mapper");
let MediaService = MediaService_1 = class MediaService {
    sqlRepo;
    logger = new common_1.Logger(MediaService_1.name);
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    async executeByDBType(fn, ...args) {
        const methodMap = {
            create: this._createSql.bind(this),
            getAll: this._getAllSql.bind(this),
            update: this._updateSql.bind(this),
        };
        const method = methodMap[fn];
        if (!method) {
            this.logger.error(`Invalid function call: ${fn}`);
            throw new common_1.InternalServerErrorException('Invalid operation');
        }
        return method(...args);
    }
    async _createSql(data, req, manager) {
        try {
            let mediaType;
            if (data.mimeType?.startsWith('image/')) {
                mediaType = 1;
            }
            else if (data.mimeType?.startsWith('video/')) {
                mediaType = 2;
            }
            else if (data.mimeType?.startsWith('audio/')) {
                mediaType = 4;
            }
            else {
                mediaType = 3;
            }
            data.mediaType = mediaType;
            const mappedData = (0, media_request_mapper_1.mediaRequestMapper)(data);
            const value = {
                ...mappedData,
                created_by: req.user.userId,
            };
            let repo;
            if (manager) {
                repo = manager.getRepository(media_entity_1.mediaEntity);
            }
            else {
                if (!this.sqlRepo) {
                    throw new common_1.InternalServerErrorException('Repository not initialized');
                }
                repo = this.sqlRepo;
            }
            const createdEntity = repo.create(value);
            await repo.save(createdEntity);
            return {
                message: specific_msg_1.MEDIA.SUCCESS.MEDIA_CREATED
            };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.MEDIA.ERRORS.CREATE_FAILED);
        }
    }
    async _getAllSql() {
        try {
            const data = await this.sqlRepo.find({ where: { status: 1 } });
            const mappedData = (0, media_response_mapper_1.mediaResponseMapper)(data);
            return {
                message: specific_msg_1.MEDIA.SUCCESS.MEDIA_FETCHED,
                data: mappedData,
            };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.MEDIA.ERRORS.FETCH_FAILED);
        }
    }
    async _updateSql(data, req, manager) {
        try {
            const { id, ...updateData } = data;
            if (!id) {
                throw new common_1.BadRequestException(specific_msg_1.MEDIA.ERRORS.REQUIRED);
            }
            const repo = manager
                ? manager.getRepository(media_entity_1.mediaEntity)
                : this.sqlRepo;
            const existing = await repo.findOne({
                where: { id }
            });
            if (!existing) {
                throw new common_1.BadRequestException(specific_msg_1.MEDIA.ERRORS.MEDIA_NOT_FOUND);
            }
            delete updateData.created_at;
            delete updateData.created_by;
            delete updateData.societyId;
            delete updateData.entityId;
            delete updateData.entityType;
            delete updateData.deleted_at;
            if (updateData.mimeType) {
                if (updateData.mimeType.startsWith('image/')) {
                    updateData.mediaType = 1;
                }
                else if (updateData.mimeType.startsWith('video/')) {
                    updateData.mediaType = 2;
                }
                else if (updateData.mimeType.startsWith('audio/')) {
                    updateData.mediaType = 4;
                }
                else {
                    updateData.mediaType = 3;
                }
            }
            const mappedUpdateData = (0, media_request_mapper_1.mediaRequestMapper)(updateData);
            if (mappedUpdateData?.status === 2) {
                mappedUpdateData.deleted_at = new Date();
            }
            else if (mappedUpdateData?.status !== undefined) {
                mappedUpdateData.deleted_at = null;
            }
            if (mappedUpdateData?.is_primary === true) {
                await repo.update({
                    entity_type: existing.entity_type,
                    entity_id: existing.entity_id,
                    is_primary: true,
                }, { is_primary: false });
            }
            await repo.update({ id }, {
                ...mappedUpdateData,
                updated_at: new Date()
            });
            return {
                message: specific_msg_1.MEDIA.SUCCESS.MEDIA_UPDATED ?? 'Media updated successfully',
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
            throw new common_1.InternalServerErrorException(specific_msg_1.MEDIA.ERRORS.UPDATE_FAILED);
        }
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = MediaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(media_entity_1.mediaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MediaService);
//# sourceMappingURL=media.service.js.map