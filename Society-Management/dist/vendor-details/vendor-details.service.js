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
var VendorDetailsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const vendor_details_entities_1 = require("./entities/vendor-details.entities");
const vendor_details_response_mapper_1 = require("./mapper/vendor-details-response.mapper");
let VendorDetailsService = VendorDetailsService_1 = class VendorDetailsService {
    vendorRepo;
    logger = new common_3.Logger(VendorDetailsService_1.name);
    constructor(vendorRepo) {
        this.vendorRepo = vendorRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createSql.bind(this),
            fetch: this._getAllVendors.bind(this),
            update: this._updateVendor.bind(this),
            delete: this._deleteVendor.bind(this),
        };
        if (!methodMap[fn]) {
            throw new Error(`Invalid action type: ${fn}`);
        }
        return methodMap[fn](...args);
    }
    async _createSql(data, req) {
        try {
            if (!data.vendorName || !data.vendorType) {
                throw new Error('vendorName and vendorType are required');
            }
            const conditions = [];
            if (data.email)
                conditions.push({ email: data.email });
            if (data.phoneNo)
                conditions.push({ phoneNo: data.phoneNo });
            if (conditions.length) {
                const existingVendor = await this.vendorRepo.findOne({
                    where: conditions,
                });
                if (existingVendor) {
                    throw new common_2.ConflictException('Vendor with this email or phone number already exists');
                }
            }
            const societyId = req.user.societyId;
            const entity = this.vendorRepo.create({
                ...data,
                societyId,
                vendorStatus: data.vendorStatus ?? vendor_details_entities_1.VendorStatus.ACTIVE,
                created_by: req.user.userId,
                updated_by: req.user.userId,
            });
            const saved = await this.vendorRepo.save(entity);
            return vendor_details_response_mapper_1.mapper.response.createVendor(saved);
        }
        catch (error) {
            this.logger.error(`Error creating vendor. Payload: ${JSON.stringify(data)}`, error.stack, 'VendorDetailsService');
            if (error instanceof common_2.ConflictException)
                throw error;
            throw new Error('Failed to create vendor');
        }
    }
    async _getAllVendors(query) {
        try {
            const page = Math.max(query.page || 1, 1);
            const limit = query.limit || 10;
            const qb = this.vendorRepo.createQueryBuilder('vendor');
            if (query.search) {
                qb.andWhere('(vendor.vendor_name ILIKE :search OR vendor.vendor_type ILIKE :search)', { search: `%${query.search}%` });
            }
            const allowedSort = [
                'created_at',
                'vendor_name',
                'vendor_type',
                'vendor_status',
            ];
            const sortBy = allowedSort.includes(query.sortBy ?? '')
                ? query.sortBy
                : 'created_at';
            const sortOrder = query.sortOrder === 'ASC' ? 'ASC' : 'DESC';
            qb.orderBy(`vendor.${sortBy}`, sortOrder);
            qb.skip((page - 1) * limit).take(limit);
            const [vendors, total] = await qb.getManyAndCount();
            return {
                message: 'Vendors fetched successfully',
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: vendors,
            };
        }
        catch (error) {
            this.logger.error('Fetch Vendors Failed', error.stack || error);
            throw new common_1.InternalServerErrorException('Failed to fetch vendors');
        }
    }
    async _updateVendor(vendorId, data, updatedBy, req) {
        try {
            const vendor = await this.vendorRepo.findOne({ where: { vendorId } });
            if (!vendor) {
                throw new common_2.ConflictException('Vendor not found');
            }
            const conditions = [];
            if (data.phoneNo)
                conditions.push({ phoneNo: data.phoneNo });
            if (data.email)
                conditions.push({ email: data.email });
            if (conditions.length) {
                const existing = await this.vendorRepo.findOne({
                    where: conditions.map((cond) => ({
                        ...cond,
                        vendorId: (0, typeorm_2.Not)(vendorId),
                    })),
                });
                if (existing) {
                    if (existing.phoneNo === data.phoneNo) {
                        throw new common_2.ConflictException('Phone number already exists');
                    }
                    if (existing.email === data.email) {
                        throw new common_2.ConflictException('Email already exists');
                    }
                }
            }
            Object.assign(vendor, data);
            vendor.updated_by = updatedBy;
            const updated = await this.vendorRepo.save(vendor);
            return {
                message: 'Vendor updated successfully',
                data: updated,
            };
        }
        catch (error) {
            this.logger.error('Update Vendor Failed', error.stack || error);
            if (error instanceof common_2.ConflictException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to update vendor');
        }
    }
    async _deleteVendor(vendorId, updatedBy) {
        try {
            const vendor = await this.vendorRepo.findOne({ where: { vendorId } });
            if (!vendor) {
                throw new common_2.ConflictException('Vendor not found');
            }
            vendor.vendorStatus = vendor_details_entities_1.VendorStatus.DELETED;
            vendor.updated_by = updatedBy;
            await this.vendorRepo.save(vendor);
            return {
                message: 'Vendor deleted successfully',
            };
        }
        catch (error) {
            this.logger.error('Delete Vendor Failed', error.stack || error);
            if (error instanceof common_2.ConflictException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to delete vendor');
        }
    }
};
exports.VendorDetailsService = VendorDetailsService;
exports.VendorDetailsService = VendorDetailsService = VendorDetailsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vendor_details_entities_1.VendorDetailsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VendorDetailsService);
//# sourceMappingURL=vendor-details.service.js.map