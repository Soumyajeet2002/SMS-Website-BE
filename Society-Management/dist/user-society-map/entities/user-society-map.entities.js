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
exports.UserSocietyMapEntity = void 0;
const typeorm_1 = require("typeorm");
let UserSocietyMapEntity = class UserSocietyMapEntity {
    id;
    user_id;
    society_id;
    user_role;
    is_active;
    created_by;
    created_at;
    updated_by;
    updated_at;
};
exports.UserSocietyMapEntity = UserSocietyMapEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserSocietyMapEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], UserSocietyMapEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], UserSocietyMapEntity.prototype, "society_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], UserSocietyMapEntity.prototype, "user_role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], UserSocietyMapEntity.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], UserSocietyMapEntity.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], UserSocietyMapEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], UserSocietyMapEntity.prototype, "updated_by", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], UserSocietyMapEntity.prototype, "updated_at", void 0);
exports.UserSocietyMapEntity = UserSocietyMapEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'user_society_map',
        schema: 'society_management',
    }),
    (0, typeorm_1.Unique)('uq_user_society', ['user_id', 'society_id'])
], UserSocietyMapEntity);
//# sourceMappingURL=user-society-map.entities.js.map