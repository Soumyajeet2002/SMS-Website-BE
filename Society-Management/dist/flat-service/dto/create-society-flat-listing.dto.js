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
exports.CreateSocietyFlatListingDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const create_media_dto_1 = require("../../media/dto/create-media.dto");
const base_flat_listing_dto_1 = require("./base-flat-listing.dto");
class CreateSocietyFlatListingDto extends base_flat_listing_dto_1.BaseFlatListingDto {
    media;
}
exports.CreateSocietyFlatListingDto = CreateSocietyFlatListingDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [create_media_dto_1.CreateMediaDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_media_dto_1.CreateMediaDto),
    __metadata("design:type", Array)
], CreateSocietyFlatListingDto.prototype, "media", void 0);
//# sourceMappingURL=create-society-flat-listing.dto.js.map