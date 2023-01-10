import { UniqueEntityID } from "../../../shared/seedwork/UniqueEntityID";
import { Account } from "../entity/Account";

export interface AccountRepository {

    save(driver: Account): Promise<void>;
    findById(id: UniqueEntityID): Promise<Account>;
    
}