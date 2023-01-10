import { Entity } from "../../../shared/seedwork/Entity";
import { DriverAssigned } from "../event/DriverAssigned";
import { MapPoint } from "../vo/MapPoint";
import { Pricing } from "../vo/Pricing";
import { TripState } from "../vo/TripState";
import { Driver } from "./Driver";
import { Rider } from "./Rider";
import { Vehicule } from "./Vehicule";


interface State {
    requestingRider: Rider;
    origin: MapPoint;
    destiny: MapPoint;
    driverAssigned: Driver;
    vehicule: Vehicule;
    pricing: Pricing;
    state: TripState;
    startedAt: Date;
    endedAt: Date;
}

export class Trip extends Entity<State> {

    assignDriver(driver: Driver, vehicule: Vehicule) {
        
        this.state.driverAssigned = driver
        this.state.vehicule = vehicule
        this.state.state = TripState.SCHEDULED
        
        this.addEvent(new DriverAssigned({
            driverID: driver.ID
        }))

    }

    cancel() {

        this.state.driverAssigned = null
        this.state.vehicule = null
        this.state.state = TripState.REQUESTING

    }

    startTrip() {
        this.state.startedAt = new Date()
        this.state.state = TripState.IN_PROGRESS
    } 


    complete() {
        this.state.state = TripState.COMPLETED
        this.state.endedAt = new Date()
    }

}