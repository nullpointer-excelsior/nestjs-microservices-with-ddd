import { ValueObject } from "../../../shared/seedwork/ValueObject";

interface Props {
    street: string;
    numberStreet: number;
    city: string;
}

export class MapPoint extends ValueObject<Props> {

}

