import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseFormatInterceptor } from './common/interceptor/response-format.interceptor';
import { ErrorFormatInterceptor } from './common/interceptor/error-format.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  app.useGlobalInterceptors(new ErrorFormatInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
