import { PersonInfo } from "../../../shared/domain/PersonInfo";
import { Entity } from "../../../shared/seedwork/Entity";
import { Account } from "./Account";
import { Vehicule } from "../vo/Vehicule";
import { DriverCreated } from "../event/DriverCreated";

interface DriverProps {
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
    account: Account;
}

interface DriverState {
    personInfo: PersonInfo;
    account: Account;
    licence: string;
    vehicule: Vehicule;
}

export class Driver extends Entity<DriverState> {

    static create(dto: DriverProps) {

        const driver = new Driver({
            account: dto.account,
            licence: dto.licence,
            personInfo: new PersonInfo({
                firstname: dto.firstname,
                lastname: dto.lastname,
                phoneNumber: dto.phoneNumber
            }),
            vehicule: new Vehicule({
                ...dto
            })
        })

        driver.addEvent(new DriverCreated({
            driverID: driver.ID
        }))

        return driver

    }

    get licence() {
        return this.state.licence
    }

    get firstname() {
        return this.state.personInfo.getValue().firstname
    }

    get lastname() {
        return this.state.personInfo.getValue().lastname
    }

    get phoneNumber() {
        return this.state.personInfo.getValue().phoneNumber
    }

}