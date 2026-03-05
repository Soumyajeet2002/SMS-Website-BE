export declare class SecureSecretsService {
    private readonly logger;
    private readonly aliasToFileMap;
    private readonly secretsDir;
    private readonly allowedKeys;
    getSecret(key: string): Promise<any>;
}
