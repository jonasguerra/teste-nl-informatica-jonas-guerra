import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";

import { ClassSerializerInterceptor } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { initSwagger } from "./app.swagger";

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  // USING TO SERVE STATIC FILE
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, "..", "static"));
  // END USING TO SERVE STATIC FILE

  app.enableCors();

  initSwagger(app);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(8000);
}
bootstrap();
