import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AdapterModule } from './infraestructure/adapter/adapter.module';
import { HttpServerModule } from './infraestructure/http-server/http-server.module';

@Module({
  imports: [CoreModule, AdapterModule, HttpServerModule]
})
export class EnrollmentMsModule {
}
