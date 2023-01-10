import { PersonInfo } from "../../../shared/domain/PersonInfo";
import { Entity } from "../../../shared/seedwork/Entity";
import { RiderCreated } from "../event/RiderCreated";
import { Account } from "./Account";

interface State {
    personInfo: PersonInfo;
    account: Account;
}

export class Rider extends Entity<State> {

    static create(dto: any) {
        
        const rider = new Rider({
            ...dto
        })
        
        rider.addEvent(new RiderCreated({
            riderID: rider.ID
        }))

        return rider
        
    }
}