import { Global, Module } from '@nestjs/common';
import { EnrollmentModule } from '../../../../libs/application/src/enrollment/enrollment.module';
import { AdapterModule } from '../infraestructure/adapter/adapter.module';

const enrollmentModule = EnrollmentModule.register({
    modules:[
        AdapterModule
    ],
    adapters: {
        accountRepository: null,
        driverRepository: null,
        riderRepository: null,
        eventbus: null,
    }
})
@Global()
@Module({
    imports: [
        enrollmentModule
    ],
    exports: [
        enrollmentModule
    ]
})
export class CoreModule {}
