import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initSwagger } from './app.swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
    // const app = await NestFactory.create(AppModule);
    
    // USING TO SERVE STATIC FILE
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'static'));
    // END USING TO SERVE STATIC FILE

    initSwagger(app);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    await app.listen(3000);
}
bootstrap();
