"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    logger = new common_1.Logger(JwtAuthGuard_1.name);
    canActivate(context) {
        this.logger.debug('🔍 JwtAuthGuard: Checking authorization...');
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            this.logger.error('❌ No Authorization header provided');
        }
        else {
            this.logger.debug(`📌 Authorization Header: ${authHeader}`);
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err) {
            this.logger.error(`❌ Auth error: ${err}`);
            throw err;
        }
        if (!user) {
            this.logger.error(`❌ User not found. Reason: ${info?.message}`);
            this.logger.error(`ℹ️ Passport returned info: ${JSON.stringify(info)}`);
            throw new common_1.UnauthorizedException('Invalid or missing token');
        }
        this.logger.debug('✅ Authenticated user:', user);
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map