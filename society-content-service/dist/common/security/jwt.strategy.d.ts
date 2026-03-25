import { Strategy } from 'passport-jwt';
import { SecureSecretsService } from '../services/secure-secret.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly secureSecretsService;
    private cachedPublicKey;
    private logger;
    constructor(secureSecretsService: SecureSecretsService);
    validate(payload: any): Promise<{
        userId: any;
        mobile: any;
        role: any;
        roleUnqId: any;
        societyId: any;
        permissions: any;
    }>;
}
export {};
