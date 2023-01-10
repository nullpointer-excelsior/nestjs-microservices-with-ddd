import { Plate } from "../../../shared/domain/Plate";
import { ValueObject } from "../../../shared/seedwork/ValueObject";
import { Capacity } from "./Capacity";
import { Color } from "./Color";
import { Model } from "./Model";
import { Year } from "./Year";

export interface VehiculeProps {
    plate: Plate;
    model: Model;
    color: Color;
    year: Year;
    capacity: Capacity;
}

export class Vehicule extends ValueObject<VehiculeProps> {

    constructor(props: {
        licence: string;
        email: string;
        firstname: string;
        lastname: string;
        phoneNumber: string;
        plate: string;
        model: string;
        color: string;
        year: string;
        capacity: number;
    }){
        super({
            plate: new Plate(props.plate),
            capacity: new Capacity(props.capacity),
            color: new Color(props.color),
            model: new Model(props.model),
            year: new Year(props.year)
        })
    }

    get plate() {
        return this.props.plate.getValue()
    }

    get model() {
        return this.props.model.getValue()
    }

    get color() {
        return this.props.color.getValue()
    }

    get year() {
        return this.props.year.getValue()
    }

    get capacity() {
        return this.props.year.getValue()
    }

}