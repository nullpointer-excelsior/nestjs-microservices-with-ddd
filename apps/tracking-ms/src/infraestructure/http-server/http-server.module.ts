import { Module } from '@nestjs/common';
import { TrackingController } from './controller/tracking.controller';

@Module({
    controllers:[
        TrackingController
    ],
})
export class HttpServerModule {}
