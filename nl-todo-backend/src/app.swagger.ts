
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
        
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Nest Template')
        .setDescription('The Template API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();


    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/swagger', app, document);
};