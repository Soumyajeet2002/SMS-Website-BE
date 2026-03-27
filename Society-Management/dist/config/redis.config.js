"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConfig = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_ioredis_yet_1 = require("cache-manager-ioredis-yet");
let RedisConfig = class RedisConfig {
    createCacheOptions() {
        const enabled = process.env.REDIS_ENABLED === 'true';
        if (!enabled) {
            console.log('🔁 Redis disabled — using in-memory cache');
            return { ttl: 300, max: 100 };
        }
        console.log('🟢 Redis enabled for cache');
        return {
            store: cache_manager_ioredis_yet_1.redisStore,
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT || 6379),
            ttl: 300,
        };
    }
};
exports.RedisConfig = RedisConfig;
exports.RedisConfig = RedisConfig = __decorate([
    (0, common_1.Injectable)()
], RedisConfig);
//# sourceMappingURL=redis.config.js.map