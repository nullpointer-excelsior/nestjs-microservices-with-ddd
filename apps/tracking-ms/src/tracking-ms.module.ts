import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { HttpServerModule } from './infraestructure/http-server/http-server.module';

@Module({
  imports: [
    CoreModule,
    HttpServerModule,
  ],
})
export class TrackingMsModule {}
