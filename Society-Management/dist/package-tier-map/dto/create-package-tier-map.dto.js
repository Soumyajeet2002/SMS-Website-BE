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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePackageTierMapDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const tier_detail_dto_1 = require("./tier-detail.dto");
const class_transformer_1 = require("class-transformer");
class CreatePackageTierMapDto {
    packageId;
    tierDetails;
}
exports.CreatePackageTierMapDto = CreatePackageTierMapDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Package id',
        example: '151f21fb-6dad-4529-b875-60ecb58dc996',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePackageTierMapDto.prototype, "packageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of tier details',
        type: [tier_detail_dto_1.TierDetailDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => tier_detail_dto_1.TierDetailDto),
    __metadata("design:type", Array)
], CreatePackageTierMapDto.prototype, "tierDetails", void 0);
//# sourceMappingURL=create-package-tier-map.dto.js.map