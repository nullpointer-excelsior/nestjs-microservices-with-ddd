import { DomainEvent } from "../../../shared/seedwork/DomainEvent"

interface Data {
    lattitude: string;
    longitude: string;
    timestamp: Date;
}

export class GpsPositionUpdated extends DomainEvent<Data> {
    
    static NAME = 'tracking.position-updated'

    get name(): string {
       return GpsPositionUpdated.NAME
    }

}