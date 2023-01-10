import { Entity } from "../../../shared/seedwork/Entity";
import { AccountCreated } from "../event/AccountCreated";
import { Email } from "../vo/Email";

interface State {
    email: Email;
    createdAt: Date;
}

export class Account extends Entity<State> {

    static create(email: string){
        
        const account = new Account({
            email: new Email(email),
            createdAt: new Date()
        })
        account.addEvent(new AccountCreated({ 
            accountId: account.ID 
        }))
        return account

    }
}