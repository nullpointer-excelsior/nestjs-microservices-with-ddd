import { ValueObject } from "../seedwork/ValueObject";

interface Props {
    firstname: string;
    lastname: string;
    phoneNumber: string;
}

export class PersonInfo extends ValueObject<Props> {
   
}