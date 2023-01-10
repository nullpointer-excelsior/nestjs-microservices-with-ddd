import { DomainEvent } from "../../../shared/seedwork/DomainEvent";
import { UniqueEntityID } from "../../../shared/seedwork/UniqueEntityID";

interface Data {
    driverID: UniqueEntityID
}

export class DriverAssigned extends DomainEvent<Data> {
    
    static NAME = 'trips.driver-assigned'

    get name(): string {
       return DriverAssigned.NAME
    }

}