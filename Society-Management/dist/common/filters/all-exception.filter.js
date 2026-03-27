"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const common_msg_1 = require("../messages/common.msg");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status;
        let message;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            switch (status) {
                case common_1.HttpStatus.BAD_REQUEST:
                    message = this.handleBadRequest(res);
                    break;
                case common_1.HttpStatus.UNAUTHORIZED:
                    message = common_msg_1.COMMON.ERRORS.UNAUTHORIZED;
                    break;
                case common_1.HttpStatus.FORBIDDEN:
                    message = common_msg_1.COMMON.ERRORS.FORBIDDEN;
                    break;
                case common_1.HttpStatus.NOT_FOUND:
                    message = res?.message || common_msg_1.COMMON.ERRORS.NOT_FOUND;
                    break;
                default:
                    message = res?.message || common_msg_1.COMMON.ERRORS.INTERNAL_SERVER_ERROR;
            }
        }
        else {
            status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            message = common_msg_1.COMMON.ERRORS.INTERNAL_SERVER_ERROR;
        }
        return response.status(status).json({
            status,
            message,
            data: [],
        });
    }
    handleBadRequest(res) {
        if (Array.isArray(res?.message)) {
            return res.message[0];
        }
        return res?.message || common_msg_1.COMMON.ERRORS.BAD_REQUEST;
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exception.filter.js.map