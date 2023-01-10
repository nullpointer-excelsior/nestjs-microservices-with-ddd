import { DomainException } from "../../../shared/seedwork/DomainException";
import { ValueObject } from "../../../shared/seedwork/ValueObject";

export class Capacity extends ValueObject<number> {
   
    constructor(value: number){
        if (value === 0) {
            throw new DomainException('Capacty can be zero')
        }
        super(value)
    }
}