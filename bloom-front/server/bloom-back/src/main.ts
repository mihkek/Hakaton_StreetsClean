import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './configs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api');
  await app.listen(process.env.port || config.PORT);
}
bootstrap();
