import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
export declare class RedisConfig implements CacheOptionsFactory {
    createCacheOptions(): CacheModuleOptions;
}
