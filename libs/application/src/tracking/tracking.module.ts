import { DynamicModule, Module, Type } from '@nestjs/common';
import { VehiculeRepository } from '@app/domain/context/tracking/port/VehiculeRepository';
import { DomainEventBus } from '@app/domain/shared/seedwork/port/DomainEventBus';
import { TrackingUseCasesService } from './services/TrackingUseCasesService';


interface TrackingModuleOptions {
    modules: Type[]
    adapters: {
        vehiculeRepository: Type<VehiculeRepository>;
        eventbus: Type<DomainEventBus>
    }
}

@Module({})
export class TrackingModule {

    static register(options: TrackingModuleOptions): DynamicModule {

        const { modules, adapters } = options
        const { vehiculeRepository, eventbus } = adapters

        return {
            module: TrackingModule,
            imports: [
                ...modules,
            ],
            exports: [
                TrackingUseCasesService,
            ],
            providers: [
                {
                    provide: TrackingUseCasesService,
                    useFactory(repository: VehiculeRepository, eventbus: DomainEventBus) {
                        return new TrackingUseCasesService(repository, eventbus)
                    },
                    inject:[
                        vehiculeRepository,
                        eventbus
                    ]
                }
            ]
        }

    }

}
