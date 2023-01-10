import { Driver } from "@app/domain/context/tracking/entity/Driver";
import { Vehicule } from "@app/domain/context/tracking/entity/Vehicule";
import { VehiculeRepository } from "@app/domain/context/tracking/port/VehiculeRepository";
import { GpsPosition } from "@app/domain/context/tracking/vo/GpsPosition";
import { Plate } from "@app/domain/shared/domain/Plate";
import { DomainEventBus } from "@app/domain/shared/seedwork/port/DomainEventBus";
import { UniqueEntityID } from "@app/domain/shared/seedwork/UniqueEntityID";
import { StartTrackingDto } from "../dto/StartTrackingDto";
import { UpdateTrackingDto } from "../dto/UpdateTrackingDto";

export class TrackingUseCasesService {

    constructor(
        private readonly vehicule: VehiculeRepository, 
        private readonly eventbus: DomainEventBus
    ) {}

    async startTracking(dto: StartTrackingDto) {

        const driver = new Driver({
            id: new UniqueEntityID(dto.driver.ID),
            ...dto.driver
        })

        const position = new GpsPosition({
            ...dto.position
        })
        
        const vehicule = new Vehicule({
            id: new UniqueEntityID(dto.vehiculeID),
            plate: new Plate(dto.plate),
            isPanicButtonActive: false,
            panicAlerts: [],
            driver: driver,
            position: position
        })

        await this.vehicule.save(vehicule)
        this.eventbus.dispatch(vehicule.pullEvents())

    }

    async updateTracking(dto: UpdateTrackingDto) {

        const vehicule = await this.vehicule.findById(new UniqueEntityID(dto.vehiculeID))
        vehicule.updatePosition(new GpsPosition({ 
            ...dto 
        }))

        await this.vehicule.save(vehicule)
        this.eventbus.dispatch(vehicule.pullEvents())

    }
    
}