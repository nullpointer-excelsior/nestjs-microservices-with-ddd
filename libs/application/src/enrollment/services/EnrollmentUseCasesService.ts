import { Account } from "@app/domain/context/enrollment/entity/Account";
import { Driver } from "@app/domain/context/enrollment/entity/Driver";
import { Rider } from "@app/domain/context/enrollment/entity/Rider";
import { AccountRepository } from "@app/domain/context/enrollment/port/AccountRepository";
import { DriverRepository } from "@app/domain/context/enrollment/port/DriverRepository";
import { RiderRepository } from "@app/domain/context/enrollment/port/RiderRepository";
import { DomainEventBus } from "@app/domain/shared/seedwork/port/DomainEventBus";
import { EnrollDriverDto } from "../dto/EnrollDriverDto";
import { EnrollRiderDto } from "../dto/EnrollRiderDto";


export class EnrollmentUseCasesService {

    constructor(
        private readonly driver: DriverRepository,
        private readonly rider: RiderRepository,
        private readonly account: AccountRepository,
        private readonly eventbus: DomainEventBus
    ) {}

    async createAccount(email: string) {
        
        const account = Account.create(email)
        
        await this.account.save(account)
        this.eventbus.dispatch(account.pullEvents())

    }

    async enrollDriver(dto: EnrollDriverDto) {
        
        const account = await this.account.findById(dto.accountID)
        const driver = Driver.create({ ...dto, account })
        
        await this.driver.save(driver)
        this.eventbus.dispatch(driver.pullEvents())

    }

    async enrollRider(dto: EnrollRiderDto) {
        
        const account = await this.account.findById(dto.accountID)
        const rider = Rider.create({ ...dto, account })
        
        this.rider.save(rider)
        this.eventbus.dispatch(rider.pullEvents())

    }

}