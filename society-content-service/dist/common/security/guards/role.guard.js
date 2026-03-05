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
var RolesGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const public_decorator_1 = require("../../decorators/public.decorator");
const optional_auth_decorator_1 = require("../../decorators/optional-auth.decorator");
let RolesGuard = RolesGuard_1 = class RolesGuard {
    reflector;
    logger = new common_1.Logger(RolesGuard_1.name);
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const handler = context.getHandler();
        const controller = context.getClass();
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [handler, controller]);
        if (isPublic) {
            this.logger.debug('Public route — skipping role validation');
            return true;
        }
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            handler,
            controller,
        ]);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const isOptionalAuth = this.reflector.getAllAndOverride(optional_auth_decorator_1.IS_OPTIONAL_AUTH_KEY, [handler, controller]);
        if (!user) {
            if (isOptionalAuth) {
                this.logger.warn('Optional auth route — no user found, skipping role validation');
                return true;
            }
            throw new common_1.ForbiddenException('User not authenticated');
        }
        const SUPER_ADMIN_ROLE = 1;
        if (Number(user.role) === SUPER_ADMIN_ROLE) {
            this.logger.debug('Super Admin access granted');
            return true;
        }
        const userRoles = Array.isArray(user.role)
            ? user.role.map((r) => Number(r))
            : [Number(user.role)];
        const hasRole = requiredRoles.some((role) => userRoles.includes(Number(role)));
        if (!hasRole) {
            this.logger.warn(`Access denied. Required: ${requiredRoles}, User: ${userRoles}`);
            throw new common_1.ForbiddenException('Access denied');
        }
        this.logger.debug('Role validation passed');
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = RolesGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=role.guard.js.map