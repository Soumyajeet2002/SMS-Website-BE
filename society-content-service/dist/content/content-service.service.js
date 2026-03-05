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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const content_entity_1 = require("./entities/content.entity");
const content_response_mapper_1 = require("./mappers/content.response.mapper");
let ContentService = class ContentService {
    sqlRepo;
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    async create(dto, req) {
        try {
            console.log('Creating content with DTO:');
            const entity = this.sqlRepo.create({
                ...dto,
                currentVersionNo: 1,
                workingVersionNo: 1,
                createdBy: req?.user?.userId,
            });
            const saved = await this.sqlRepo.save(entity);
            return {
                message: 'Content created successfully',
                data: (0, content_response_mapper_1.contentResponseMapper)(saved),
            };
        }
        catch (error) {
            if (error?.code === '23505') {
                throw new common_1.BadRequestException('Duplicate slug');
            }
            throw new common_1.InternalServerErrorException('Content creation failed');
        }
    }
    async findOne(contentId) {
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
    async findAll() {
        const data = await this.sqlRepo.find();
        return {
            message: 'Contents fetched successfully',
            total: data.length,
            data: data.map(content_response_mapper_1.contentResponseMapper),
        };
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(content_entity_1.ContentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContentService);
//# sourceMappingURL=content-service.service.js.map