import { Driver } from "../entity/Driver";

export interface DriverRepository {

    save(driver: Driver): Promise<void>;
    findAll(): Promise<Driver[]>;

}