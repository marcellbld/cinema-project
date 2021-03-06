import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env['CLIENT'] || 'http://localhost:4000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
