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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const secure_secret_service_1 = require("../services/secure-secret.service");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    secureSecretsService;
    cachedPublicKey;
    logger = new common_1.Logger(JwtStrategy_1.name);
    constructor(secureSecretsService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            algorithms: ['RS256'],
            issuer: process.env.JWT_ISSUER || 'sms-identity',
            audience: process.env.JWT_AUDIENCE || 'sms-api',
            ignoreExpiration: false,
            secretOrKeyProvider: async (request, rawJwtToken, done) => {
                try {
                    if (!this.cachedPublicKey) {
                        const secretResponse = await this.secureSecretsService.getSecret('JWT_PUBLIC_KEY');
                        if (!secretResponse?.status || !secretResponse?.content) {
                            return done(new Error(secretResponse?.message ||
                                'Failed to load JWT public key'));
                        }
                        this.cachedPublicKey = secretResponse.content;
                    }
                    return done(null, this.cachedPublicKey);
                }
                catch (error) {
                    return done(error);
                }
            },
        });
        this.secureSecretsService = secureSecretsService;
    }
    async validate(payload) {
        if (!payload?.sub) {
            this.logger.error('Invalid token');
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return {
            userId: payload.sub,
            mobile: payload.mobile,
            role: payload.role,
            roleUnqId: payload.roleUnqId,
            societyId: payload.societyId,
            permissions: payload.permissions ?? [],
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [secure_secret_service_1.SecureSecretsService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map