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
var ResidentDetailsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResidentDetailsService = void 0;
const common_1 = require("@nestjs/common");
const resident_details_entities_1 = require("./entities/resident-details.entities");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const specific_msg_1 = require("../common/messages/specific.msg");
const resident_details_request_mapper_1 = require("./mapper/resident-details.request.mapper");
let ResidentDetailsService = ResidentDetailsService_1 = class ResidentDetailsService {
    sqlRepo;
    logger = new common_1.Logger(ResidentDetailsService_1.name);
    constructor(sqlRepo) {
        this.sqlRepo = sqlRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createSql.bind(this)
        };
        const method = methodMap[fn];
        if (!method)
            throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }
    async _createSql(data, req) {
        const mappedEntity = (0, resident_details_request_mapper_1.residentDetailsReqMapper)(data);
        try {
            const entity = this.sqlRepo.create({ ...mappedEntity, created_by: req.user.userId });
            await this.sqlRepo.save(entity);
            return { message: specific_msg_1.USERRESIDENTMAP.SUCCESS.RESIDENT_CREATED };
        }
        catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });
            throw new common_1.InternalServerErrorException(specific_msg_1.USERRESIDENTMAP.ERRORS.CREATE_FAILED);
        }
    }
};
exports.ResidentDetailsService = ResidentDetailsService;
exports.ResidentDetailsService = ResidentDetailsService = ResidentDetailsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(resident_details_entities_1.ResidentDetails)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ResidentDetailsService);
//# sourceMappingURL=resident-details.service.js.map