import { Injectable } from "@nestjs/common";
import { Vehicule } from "@app/domain/context/tracking/entity/Vehicule";
import { VehiculeRepository } from "@app/domain/context/tracking/port/VehiculeRepository";
import { UniqueEntityID } from "@app/domain/shared/seedwork/UniqueEntityID";

@Injectable()
export class VehiculeService implements VehiculeRepository {
    
    private vehicules: Map<UniqueEntityID, Vehicule> = new Map()

    async save(vehicule: Vehicule): Promise<void> {
        this.vehicules.set(vehicule.ID, vehicule)
    }
    
    async findById(id: UniqueEntityID): Promise<Vehicule> {
        return this.vehicules.get(id)
    }

}