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
exports.VendorDetailsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vendor_details_service_1 = require("./vendor-details.service");
const create_vendor_details_dto_1 = require("./dto/create-vendor-details.dto");
const fetch_vendor_details_dto_1 = require("./dto/fetch-vendor-details.dto");
const update_vendor_details_dto_1 = require("./dto/update-vendor-details.dto");
let VendorDetailsController = class VendorDetailsController {
    vendorDetailsService;
    constructor(vendorDetailsService) {
        this.vendorDetailsService = vendorDetailsService;
    }
    create(dto, req) {
        return this.vendorDetailsService.executeByActionType('create', dto, req);
    }
    async getAllVendors(query) {
        return this.vendorDetailsService.executeByActionType('fetch', query);
    }
    async updateVendor(vendorId, data) {
        return this.vendorDetailsService.executeByActionType('update', vendorId, data);
    }
    async deleteVendor(vendorId) {
        return this.vendorDetailsService.executeByActionType('delete', vendorId);
    }
};
exports.VendorDetailsController = VendorDetailsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create Vendor' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vendor_details_dto_1.CreateVendorDetailsDto, Object]),
    __metadata("design:returntype", void 0)
], VendorDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'GET_ALL_VENDORS' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fetch_vendor_details_dto_1.GetVendorQueryDto]),
    __metadata("design:returntype", Promise)
], VendorDetailsController.prototype, "getAllVendors", null);
__decorate([
    (0, common_1.Patch)(':vendorId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a vendor by ID' }),
    __param(0, (0, common_1.Param)('vendorId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vendor_details_dto_1.UpdateVendorDto]),
    __metadata("design:returntype", Promise)
], VendorDetailsController.prototype, "updateVendor", null);
__decorate([
    (0, common_1.Delete)(':vendorId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete vendor by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vendor deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Vendor not found' }),
    __param(0, (0, common_1.Param)('vendorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VendorDetailsController.prototype, "deleteVendor", null);
exports.VendorDetailsController = VendorDetailsController = __decorate([
    (0, swagger_1.ApiTags)('Vendors'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('vendor_details'),
    __metadata("design:paramtypes", [vendor_details_service_1.VendorDetailsService])
], VendorDetailsController);
//# sourceMappingURL=vendor-details.controller.js.map