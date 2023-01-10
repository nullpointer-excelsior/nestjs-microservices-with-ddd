import { Global, Module } from '@nestjs/common';
import { TrackingModule } from '@app/application/tracking/tracking.module';
import { AdapterModule } from '../infraestructure/adapter/adapter.module';
import { TrackingEventService } from '../infraestructure/adapter/services/tracking-event.service';
import { VehiculeService } from '../infraestructure/adapter/services/vehicule.service';

const trackingModule = TrackingModule.register({
    modules: [
        AdapterModule
    ],
    adapters: {
        vehiculeRepository: VehiculeService,
        eventbus: TrackingEventService
    }
})

@Global()
@Module({
    imports:[
        trackingModule
    ],
    exports: [
        trackingModule
    ]
})
export class CoreModule {}
