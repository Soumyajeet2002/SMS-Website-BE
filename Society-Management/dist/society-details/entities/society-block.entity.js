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
exports.SocietyBlockEntity = void 0;
const typeorm_1 = require("typeorm");
const society_details_entity_1 = require("./society-details.entity");
let SocietyBlockEntity = class SocietyBlockEntity {
    blockId;
    societyId;
    society;
    blockName;
    blockCode;
    totalFloors;
    totalFlats;
    parkingSlot;
    blockType;
    status;
    createdBy;
    createdAt;
    updatedBy;
    updatedAt;
    isDeleted;
};
exports.SocietyBlockEntity = SocietyBlockEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'block_id' }),
    __metadata("design:type", String)
], SocietyBlockEntity.prototype, "blockId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'society_id', type: 'uuid' }),
    __metadata("design:type", String)
], SocietyBlockEntity.prototype, "societyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => society_details_entity_1.SocietySetupDetailsEntity, (society) => society.blocks),
    (0, typeorm_1.JoinColumn)({ name: 'society_id' }),
    __metadata("design:type", society_details_entity_1.SocietySetupDetailsEntity)
], SocietyBlockEntity.prototype, "society", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'block_name', length: 100 }),
    __metadata("design:type", String)
], SocietyBlockEntity.prototype, "blockName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'block_code', length: 50 }),
    __metadata("design:type", String)
], SocietyBlockEntity.prototype, "blockCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_floors', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SocietyBlockEntity.prototype, "totalFloors", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_flats', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SocietyBlockEntity.prototype, "totalFlats", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parking_slot', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SocietyBlockEntity.prototype, "parkingSlot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'block_type', length: 50, nullable: true }),
    __metadata("design:type", String)
], SocietyBlockEntity.prototype, "blockType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'smallint',
        default: 1,
    }),
    __metadata("design:type", Number)
], SocietyBlockEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid' }),
    __metadata("design:type", String)
], SocietyBlockEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'now()',
    }),
    __metadata("design:type", Date)
], SocietyBlockEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], SocietyBlockEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SocietyBlockEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_deleted',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], SocietyBlockEntity.prototype, "isDeleted", void 0);
exports.SocietyBlockEntity = SocietyBlockEntity = __decorate([
    (0, typeorm_1.Entity)({
        schema: 'society_management',
        name: 'society_blocks',
    })
], SocietyBlockEntity);
//# sourceMappingURL=society-block.entity.js.map