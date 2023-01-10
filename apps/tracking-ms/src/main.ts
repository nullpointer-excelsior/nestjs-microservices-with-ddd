import { NestFactory } from '@nestjs/core';
import { TrackingMsModule } from './tracking-ms.module';

async function bootstrap() {
  const app = await NestFactory.create(TrackingMsModule);
  await app.listen(3000);
}
bootstrap();
