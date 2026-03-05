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
var ContentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const class_validator_1 = require("class-validator");
const content_entity_1 = require("./entities/content.entity");
const content_response_mapper_1 = require("./mappers/content.response.mapper");
let ContentService = ContentService_1 = class ContentService {
    sqlRepo;
    logger = new common_1.Logger(ContentService_1.name);
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createContentSql.bind(this),
            findAll: this._findAllSql.bind(this),
            findOne: this._findOneSql.bind(this),
            remove: this._removeContentSql.bind(this),
        };
        const method = methodMap[fn];
        if (!method)
            throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }
    async _createContentSql(dto, req) {
        try {
            const entity = this.sqlRepo.create({
                ...dto,
                currentVersionNo: 1,
                workingVersionNo: 1,
                createdBy: req?.id ?? req?.userId,
            });
            const saved = await this.sqlRepo.save(entity);
            return {
                message: 'Content created successfully',
                data: (0, content_response_mapper_1.contentResponseMapper)(saved),
            };
        }
        catch (error) {
            if (error instanceof Error) {
                this.logger.error({
                    error: error.message,
                    stack: error.stack,
                    payload: dto,
                });
            }
            throw new common_1.InternalServerErrorException('Content creation failed');
        }
    }
    async _findAllSql() {
        try {
            const data = await this.sqlRepo.find();
            return {
                message: 'Contents fetched successfully',
                total: data.length,
                data: data.map(content_response_mapper_1.contentResponseMapper),
            };
        }
        catch (error) {
            if (error instanceof Error) {
                this.logger.error({
                    error: error.message,
                    stack: error.stack,
                });
            }
            throw new common_1.InternalServerErrorException('Content fetch failed');
        }
    }
    async _findOneSql(contentId) {
        if (!(0, class_validator_1.isUUID)(contentId)) {
            throw new common_1.BadRequestException('Invalid Content ID');
        }
        try {
            const entity = await this.sqlRepo.findOne({
                where: { contentId },
            });
            if (!entity) {
                throw new common_1.NotFoundException('Content not found');
            }
            return {
                message: 'Content fetched successfully',
                data: (0, content_response_mapper_1.contentResponseMapper)(entity),
            };
        }
        catch (error) {
            if (error instanceof Error) {
                this.logger.error({
                    error: error.message,
                    stack: error.stack,
                });
            }
            throw new common_1.InternalServerErrorException('Content fetch failed');
        }
    }
    async _removeContentSql(contentId) {
        try {
            await this._findOneSql(contentId);
            await this.sqlRepo.delete({ contentId });
            return {
                message: 'Content deleted successfully',
            };
        }
        catch (error) {
            if (error instanceof Error) {
                this.logger.error({
                    error: error.message,
                    stack: error.stack,
                });
            }
            throw new common_1.InternalServerErrorException('Content delete failed');
        }
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = ContentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(content_entity_1.ContentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContentService);
//# sourceMappingURL=content-service.service.js.map