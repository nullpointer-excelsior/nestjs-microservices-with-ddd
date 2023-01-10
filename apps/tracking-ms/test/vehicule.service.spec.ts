import { Vehicule } from "../../../libs/domain/src/context/tracking/entity/Vehicule"
import { GpsPosition } from "../../../libs/domain/src/context/tracking/vo/GpsPosition"
import { Plate } from "../../../libs/domain/src/shared/domain/Plate"
import { VehiculeService } from "../src/infraestructure/adapter/services/vehicule.service"

describe('VehiculeService',() => {

    it('get vehicule', async () =>{
        
        const service = new VehiculeService()
        const vehicule1 = new Vehicule({
            driver: null,
            panicAlerts: [],
            plate: new Plate('ABCD-1234'),
            isPanicButtonActive: false,
            position: new GpsPosition({
                lattitude: '1',
                longitude: '2',
                timestamp: new Date()
            })
        })
        const vehicule2 = new Vehicule({
            driver: null,
            panicAlerts: [],
            plate: new Plate('ABCD-5432'),
            isPanicButtonActive: false,
            position: new GpsPosition({
                lattitude: '1',
                longitude: '2',
                timestamp: new Date()
            })
        })
        service.save(vehicule1)
        service.save(vehicule2)

        const result = await service.findById(vehicule2.ID)
        expect(result.ID).toBe(vehicule2.ID)

    })
})