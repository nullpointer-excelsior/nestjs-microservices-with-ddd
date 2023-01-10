import { NestFactory } from '@nestjs/core';
import { EnrollmentMsModule } from './enrollment-ms.module';

async function bootstrap() {
  const app = await NestFactory.create(EnrollmentMsModule);
  await app.listen(3100);
}
bootstrap();
