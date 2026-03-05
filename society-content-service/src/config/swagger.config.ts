import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
const serverUrl = process.env.SWAGGER_SERVER_URL || 'http://localhost:3004';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Society Content Service API')
  .setDescription('API documentation for Society Content Service System')
  .setVersion('1.0')
  .addServer(serverUrl, 'Environment Server')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      description: 'Enter JWT access token',
    },
    'access-token', // MUST match @ApiBearerAuth('access-token')
  )
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true, // Keeps token when page refreshes 
  },
};
