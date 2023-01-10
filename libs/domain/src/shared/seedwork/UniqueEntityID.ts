import { Identifier } from "./Identifier"
import { v4 as uuidv4 } from 'uuid';


export class UniqueEntityID extends Identifier<string>{

    constructor(id?: string) {
        super(id ? id : uuidv4())
    }

}
