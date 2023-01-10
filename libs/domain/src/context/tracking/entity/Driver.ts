import { Entity } from "../../../shared/seedwork/Entity";

interface State {
    firstname: string;
    lastname: string;
    cellphone: string;
}

export class Driver extends Entity<State> {
    
    get fullname() {
        return `${this.state.firstname} ${this.state.lastname}`
    }

    get cellphone() {
        return this.state.cellphone
    }

}