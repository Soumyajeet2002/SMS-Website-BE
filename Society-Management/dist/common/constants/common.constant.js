"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.HTTP_METHOD = exports.USER_UUID_ID = void 0;
exports.USER_UUID_ID = '550e8400-e29b-41d4-a716-446655440000';
var HTTP_METHOD;
(function (HTTP_METHOD) {
    HTTP_METHOD["UPDATE"] = "UPDATE";
    HTTP_METHOD["CREATE"] = "CREATE";
    HTTP_METHOD["DELETE"] = "DELETE";
})(HTTP_METHOD || (exports.HTTP_METHOD = HTTP_METHOD = {}));
var UserRole;
(function (UserRole) {
    UserRole[UserRole["SUPER_ADMIN"] = 1] = "SUPER_ADMIN";
    UserRole[UserRole["ADMIN"] = 2] = "ADMIN";
    UserRole[UserRole["SOCIETY_ADMIN"] = 3] = "SOCIETY_ADMIN";
    UserRole[UserRole["SECURITY_GUARD"] = 4] = "SECURITY_GUARD";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=common.constant.js.map