import { Rider } from "../entity/Rider";

export interface RiderRepository {

    save(driver: Rider): Promise<void>;
    
}