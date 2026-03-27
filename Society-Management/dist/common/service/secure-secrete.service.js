"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var SecureSecretsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureSecretsService = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const common_1 = require("@nestjs/common");
const authentication_constant_1 = require("../constants/authentication.constant");
let SecureSecretsService = SecureSecretsService_1 = class SecureSecretsService {
    logger = new common_1.Logger(SecureSecretsService_1.name);
    aliasToFileMap = authentication_constant_1.aliasToFileMap;
    secretsDir = process.env.NODE_ENV === 'LOCAL'
        ? path.join(process.cwd(), 'keys')
        : path.join(process.cwd(), 'keys');
    allowedKeys = new Set(Object.values(this.aliasToFileMap));
    async getSecret(key) {
        const keyData = key.trim();
        const trimmedKey = this.aliasToFileMap[keyData];
        if (!trimmedKey || !this.allowedKeys.has(trimmedKey)) {
            const message = `Access to secret '${keyData}' is not allowed.`;
            this.logger.error(message);
            return { status: false, statusCode: 403, message };
        }
        try {
            const files = await fs.readdir(this.secretsDir);
            const matchedFile = files.find((file) => path.parse(file).name === trimmedKey);
            if (!matchedFile) {
                const message = `Secret file for key '${trimmedKey}' not found.`;
                this.logger.error(message);
                return { status: false, statusCode: 404, message };
            }
            const filePath = path.join(this.secretsDir, matchedFile);
            const content = await fs.readFile(filePath, 'utf-8');
            return { status: true, content };
        }
        catch (error) {
            const message = `Failed to read secret file '${trimmedKey}': ${error}`;
            this.logger.error(message);
            return { status: false, statusCode: 500, message };
        }
    }
};
exports.SecureSecretsService = SecureSecretsService;
exports.SecureSecretsService = SecureSecretsService = SecureSecretsService_1 = __decorate([
    (0, common_1.Injectable)()
], SecureSecretsService);
//# sourceMappingURL=secure-secrete.service.js.map