import { ValueObject } from "../../../shared/seedwork/ValueObject";

interface Props {
    lattitude: string;
    longitude: string;
    timestamp: Date;
}

export class GpsPosition extends ValueObject<Props>{

}