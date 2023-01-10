import { Entity } from "../../../shared/seedwork/Entity";
import { GpsPosition } from "../vo/GpsPosition";

export interface PanicAlertState {
    position: GpsPosition;
    type: 'button-panic-active' | 'button-panic-desactive'
}

export class PanicAlert extends Entity<PanicAlertState> {

    get timestamp() {
        return this.state.position.getValue().timestamp
    }

    get position() {
        return this.state.position
    }

    get type() {
        return this.state.type
    }

}