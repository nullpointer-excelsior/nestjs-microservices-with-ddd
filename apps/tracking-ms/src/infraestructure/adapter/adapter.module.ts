import { Module } from '@nestjs/common';
import { EventQueueModule } from '../../../../../libs/shared/src/event-queue/event-queue.module';
import { TrackingEventService } from './services/tracking-event.service';
import { VehiculeService } from './services/vehicule.service';

const providersToExport = [
    VehiculeService,
    TrackingEventService
]

@Module({
    providers: [
        ...providersToExport
    ],
    imports: [
        EventQueueModule
    ],
    exports: [
        ...providersToExport
    ]
})
export class AdapterModule {}
