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
exports.CommuteService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let CommuteService = class CommuteService {
    http;
    constructor(http) {
        this.http = http;
    }
    async getUserProfile(req, userId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.http.get(`${process.env.IDENTITY_SERVICE_URL}users`, {
                headers: {
                    Authorization: req.headers['authorization'],
                    'x-internal-call': 'true',
                },
            }));
            return response.data;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Failed to fetch user profile');
        }
    }
};
exports.CommuteService = CommuteService;
exports.CommuteService = CommuteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CommuteService);
//# sourceMappingURL=commute.service.js.map