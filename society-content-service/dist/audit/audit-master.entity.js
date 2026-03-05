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
exports.MasterAuditLog = void 0;
const typeorm_1 = require("typeorm");
let MasterAuditLog = class MasterAuditLog {
    audit_id;
    table_name;
    record_id;
    action_type;
    old_data;
    new_data;
    changed_by;
    changed_at;
    ip_address;
    platform;
};
exports.MasterAuditLog = MasterAuditLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MasterAuditLog.prototype, "audit_id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], MasterAuditLog.prototype, "table_name", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], MasterAuditLog.prototype, "record_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], MasterAuditLog.prototype, "action_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MasterAuditLog.prototype, "old_data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], MasterAuditLog.prototype, "new_data", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", Object)
], MasterAuditLog.prototype, "changed_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], MasterAuditLog.prototype, "changed_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'inet', nullable: true }),
    __metadata("design:type", Object)
], MasterAuditLog.prototype, "ip_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], MasterAuditLog.prototype, "platform", void 0);
exports.MasterAuditLog = MasterAuditLog = __decorate([
    (0, typeorm_1.Entity)({ schema: 'society_master', name: 'master_audit_log' })
], MasterAuditLog);
//# sourceMappingURL=audit-master.entity.js.map