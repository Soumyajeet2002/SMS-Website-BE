"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerCustomOptions = exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const serverUrl = process.env.SWAGGER_SERVER_URL || 'http://localhost:3004';
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('Society Content Service API')
    .setDescription('API documentation for Society Content Service System')
    .setVersion('1.0')
    .addServer(serverUrl, 'Environment Server')
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
    description: 'Enter JWT access token',
}, 'access-token')
    .build();
exports.swaggerCustomOptions = {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true,
    },
};
//# sourceMappingURL=swagger.config.js.map