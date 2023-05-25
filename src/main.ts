import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  const PORT = config.get("PORT");
  const HOST = config.get("HOST");
  await app.listen(PORT || 3001, () => {
    console.log("Server has been connected on " + HOST + PORT)
  });
}
bootstrap();
