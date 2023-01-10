import { DynamicModule, Module, Type } from '@nestjs/common';
import { AccountRepository } from '@app/domain/context/enrollment/port/AccountRepository';
import { DriverRepository } from '@app/domain/context/enrollment/port/DriverRepository';
import { RiderRepository } from '@app/domain/context/enrollment/port/RiderRepository';
import { DomainEventBus } from '@app/domain/shared/seedwork/port/DomainEventBus';
import { EnrollmentUseCasesService } from './services/EnrollmentUseCasesService';

interface EnrollmentModuleOptions {
    modules: Type[]
    adapters: {
        accountRepository: Type<AccountRepository>;
        driverRepository: Type<DriverRepository>;
        riderRepository: Type<RiderRepository>;
        eventbus: Type<DomainEventBus>
    }
}


@Module({})
export class EnrollmentModule {

    static register(options: EnrollmentModuleOptions): DynamicModule {

        const { modules, adapters } = options
        const { accountRepository, riderRepository, driverRepository, eventbus } = adapters

        return {
            module: EnrollmentModule,
            imports: [
                ...modules,
            ],
            exports: [
                EnrollmentUseCasesService,
            ],
            providers: [
                {
                    provide: EnrollmentUseCasesService,
                    useFactory(driver: DriverRepository, rider: RiderRepository, account: AccountRepository, eventbus: DomainEventBus) {
                        return new EnrollmentUseCasesService(driver, rider, account, eventbus)
                    },
                    inject: [
                        driverRepository,
                        riderRepository,
                        accountRepository,
                        eventbus
                    ]
                }
            ]
        }

    }
}
