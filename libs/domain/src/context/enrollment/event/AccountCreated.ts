import { DomainEvent } from "../../../shared/seedwork/DomainEvent";
import { UniqueEntityID } from "../../../shared/seedwork/UniqueEntityID";

interface Data {
    accountId: UniqueEntityID
}

export class AccountCreated extends DomainEvent<Data> {
    
    static NAME = 'enrollment.account-created'

    get name(): string {
       return AccountCreated.NAME
    }

}