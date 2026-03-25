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
exports.GuestUserEntity = exports.BookingStatusGuest = exports.GuestUserStatus = void 0;
const typeorm_1 = require("typeorm");
var GuestUserStatus;
(function (GuestUserStatus) {
    GuestUserStatus[GuestUserStatus["INACTIVE"] = 0] = "INACTIVE";
    GuestUserStatus[GuestUserStatus["ACTIVE"] = 1] = "ACTIVE";
    GuestUserStatus[GuestUserStatus["DELETED"] = 2] = "DELETED";
})(GuestUserStatus || (exports.GuestUserStatus = GuestUserStatus = {}));
var BookingStatusGuest;
(function (BookingStatusGuest) {
    BookingStatusGuest[BookingStatusGuest["PENDING"] = 0] = "PENDING";
    BookingStatusGuest[BookingStatusGuest["BOOKED"] = 1] = "BOOKED";
    BookingStatusGuest[BookingStatusGuest["COMPLETED"] = 2] = "COMPLETED";
    BookingStatusGuest[BookingStatusGuest["CANCELLED"] = 3] = "CANCELLED";
    BookingStatusGuest[BookingStatusGuest["NO_SHOW"] = 4] = "NO_SHOW";
})(BookingStatusGuest || (exports.BookingStatusGuest = BookingStatusGuest = {}));
let GuestUserEntity = class GuestUserEntity {
    guestId;
    fullName;
    mobileNo;
    email;
    city;
    projectDescription;
    source;
    status;
    metadata;
    createdBy;
    createdAt;
    updatedBy;
    updatedAt;
};
exports.GuestUserEntity = GuestUserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'guest_id' }),
    __metadata("design:type", String)
], GuestUserEntity.prototype, "guestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', length: 150 }),
    __metadata("design:type", String)
], GuestUserEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mobile_no', length: 20 }),
    __metadata("design:type", String)
], GuestUserEntity.prototype, "mobileNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', length: 150, nullable: true }),
    __metadata("design:type", String)
], GuestUserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city', length: 100, nullable: true }),
    __metadata("design:type", String)
], GuestUserEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'project_description', type: 'text', nullable: true }),
    __metadata("design:type", String)
], GuestUserEntity.prototype, "projectDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'source', length: 50, nullable: true }),
    __metadata("design:type", String)
], GuestUserEntity.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        default: GuestUserStatus.ACTIVE,
        comment: '0=Inactive, 1=Active, 2=Deleted',
    }),
    __metadata("design:type", Number)
], GuestUserEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'metadata', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], GuestUserEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], GuestUserEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], GuestUserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], GuestUserEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], GuestUserEntity.prototype, "updatedAt", void 0);
exports.GuestUserEntity = GuestUserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'guest_users', schema: 'society_cms' }),
    (0, typeorm_1.Index)('idx_guest_users_status', ['status']),
    (0, typeorm_1.Index)('idx_guest_users_mobile', ['mobileNo']),
    (0, typeorm_1.Index)('idx_guest_users_email', ['email'])
], GuestUserEntity);
//# sourceMappingURL=guest-users.entities.js.map