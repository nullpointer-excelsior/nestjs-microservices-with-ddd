import { DomainEvent } from "../../../shared/seedwork/DomainEvent";
import { UniqueEntityID } from "../../../shared/seedwork/UniqueEntityID";

interface Data {
    riderID: UniqueEntityID
}

export class RiderCreated extends DomainEvent<Data> {
    
    static NAME = 'enrollment.rider-created'

    get name(): string {
       return RiderCreated.NAME
    }

}