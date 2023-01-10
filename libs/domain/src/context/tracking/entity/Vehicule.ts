import { Entity, EntityProps } from "../../../shared/seedwork/Entity";
import { ButtonPanicActivated } from "../event/ButtonPanicActivated";
import { ButtonPanicDesactivated } from "../event/ButtonPanicDesactivated";
import { Plate } from "../../../shared/domain/Plate";
import { GpsPosition } from "../vo/GpsPosition";
import { Driver } from "./Driver";
import { PanicAlert } from "./PanicAlert";
import { GpsPositionUpdated } from "../event/GpsPositionUpdated";


export interface VehiculeState {
    plate: Plate;
    driver: Driver;
    position: GpsPosition;
    isPanicButtonActive: boolean;
    panicAlerts: PanicAlert[]
}

export class Vehicule extends Entity<VehiculeState> {

    constructor(props: EntityProps<VehiculeState>) {
        super(props)
        this.addEvent(
            new GpsPositionUpdated({
                ...this.state.position.getValue()
            })
        )
    }

    updatePosition(position: GpsPosition) {

        this.state.position = position

        this.addEvent(new GpsPositionUpdated({
            ...position.getValue()
        }))

    }

    activeButtonPanic(position: GpsPosition) {

        this.state.isPanicButtonActive = true
        this.state.position = position
        this.state.panicAlerts.push(new PanicAlert({
            position: position,
            type: 'button-panic-active'
        }))

        this.addEvent(new ButtonPanicActivated({
            vehiculeID: this.ID,
            position: position
        }))

    }

    desactiveButtonPanic(position: GpsPosition) {

        if (!this.state.isPanicButtonActive) {
            return
        }

        this.state.isPanicButtonActive = false
        this.state.position = position

        this.state.panicAlerts.push(new PanicAlert({
            position: position,
            type: 'button-panic-desactive'
        }))

        this.addEvent(new ButtonPanicDesactivated({
            vehiculeID: this.ID,
            position: position
        }))

    }

    get plate() {
        return this.state.plate
    }

    get position() {
        return this.state.position
    }

    get driver() {
        return this.state.driver
    }

    get isButtonPanicActive() {
        return this.state.isPanicButtonActive
    }

}
