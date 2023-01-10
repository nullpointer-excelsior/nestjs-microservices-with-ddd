import { UniqueEntityID } from "../../../shared/seedwork/UniqueEntityID";
import { Vehicule } from "../entity/Vehicule";

export interface VehiculeRepository {

    save(vehicule: Vehicule): Promise<void>;
    findById(id: UniqueEntityID): Promise<Vehicule>;

}