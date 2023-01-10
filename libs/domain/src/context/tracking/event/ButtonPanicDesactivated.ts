import { DomainEvent } from "../../../shared/seedwork/DomainEvent";
import { UniqueEntityID } from "../../../shared/seedwork/UniqueEntityID";
import { GpsPosition } from "../vo/GpsPosition";

interface Data {
    vehiculeID: UniqueEntityID;
    position: GpsPosition;
}

export class ButtonPanicDesactivated extends DomainEvent<Data> {
    
    static NAME = 'tracking.button-panic-desactivated'

    get name(): string {
       return ButtonPanicDesactivated.NAME
    }

}