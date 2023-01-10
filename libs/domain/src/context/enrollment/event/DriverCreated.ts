import { DomainEvent } from "../../../shared/seedwork/DomainEvent";
import { UniqueEntityID } from "../../../shared/seedwork/UniqueEntityID";

interface Data {
    driverID: UniqueEntityID
}

export class DriverCreated extends DomainEvent<Data> {
    
    static NAME = 'enrollment.driver-created'

    get name(): string {
       return DriverCreated.NAME
    }

}